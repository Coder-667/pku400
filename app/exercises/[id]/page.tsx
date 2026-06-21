import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface ExerciseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExerciseDetailPage({ params }: ExerciseDetailPageProps) {
  const { id } = await params;
  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: { chapter: { include: { book: true } } },
  });

  if (!exercise) notFound();

  let tags: string[] = [];
  try { tags = JSON.parse(exercise.tags); } catch { tags = []; }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/books" className="hover:text-foreground">书目</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/books/${exercise.chapter.book.id}`} className="hover:text-foreground">
          {exercise.chapter.book.title}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/books/${exercise.chapter.book.id}/chapters/${exercise.chapter.id}`} className="hover:text-foreground">
          {exercise.chapter.title}
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Badge className={DIFFICULTY_COLORS[exercise.difficulty]} variant="outline">
          {DIFFICULTY_LABELS[exercise.difficulty]}
        </Badge>
        <Badge variant="secondary">
          {exercise.type === "ai_generated" ? "AI生成" : "教材原题"}
        </Badge>
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </div>

      <div className="mb-8 p-6 rounded-lg border bg-card">
        <h2 className="text-lg font-semibold mb-4">题目</h2>
        <MarkdownRenderer content={exercise.question} />
      </div>

      {exercise.answer && (
        <div className="mb-6 p-6 rounded-lg border bg-muted/30">
          <h2 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-400">答案</h2>
          <MarkdownRenderer content={exercise.answer} />
        </div>
      )}

      {exercise.explanation && (
        <div className="mb-8 p-6 rounded-lg border bg-muted/30">
          <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-400">解析</h2>
          <MarkdownRenderer content={exercise.explanation} />
        </div>
      )}

      {exercise.source && (
        <p className="text-sm text-muted-foreground mb-8">来源：{exercise.source}</p>
      )}

      {exercise.theaLink && (
        <a
          href={exercise.theaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          在 Thea.Study 中查看
        </a>
      )}
    </div>
  );
}
