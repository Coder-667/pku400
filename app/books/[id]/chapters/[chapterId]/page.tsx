import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChapterTabs } from "./ChapterTabs";

export async function generateStaticParams() {
  const books = await prisma.book.findMany({
    include: { chapters: { select: { id: true } } },
  });
  const params: { id: string; chapterId: string }[] = [];
  for (const book of books) {
    for (const ch of book.chapters) {
      params.push({ id: book.id, chapterId: ch.id });
    }
  }
  return params;
}

interface ChapterPageProps {
  params: Promise<{ id: string; chapterId: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { id, chapterId } = await params;
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: {
      book: true,
      exercises: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!chapter || chapter.bookId !== id) notFound();

  const exerciseSummaries = chapter.exercises.map((ex) => ({
    id: ex.id,
    question: ex.question,
    difficulty: ex.difficulty,
    tags: ex.tags,
    type: ex.type,
  }));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/books" className="hover:text-foreground">书目</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/books/${chapter.book.id}`} className="hover:text-foreground">{chapter.book.title}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{chapter.title}</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">{chapter.title}</h1>
          {chapter.syllabusRef && (
            <Badge variant="secondary">{chapter.syllabusRef}</Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          {chapter.book.title} · 第{chapter.order}章
        </p>
      </div>

      <ChapterTabs
        chapterId={chapter.id}
        content={chapter.content}
        exercises={exerciseSummaries}
      />
    </div>
  );
}
