import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, BookOpen, Dumbbell, Download } from "lucide-react";
import { notFound } from "next/navigation";

interface BookDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: { _count: { select: { exercises: true } } },
      },
    },
  });

  if (!book) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/books" className="hover:text-foreground">书目</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{book.title}</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <Badge className={CATEGORY_COLORS[book.category]} variant="outline">
            {CATEGORY_LABELS[book.category]}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-2">作者：{book.author} | 出版社：{book.publisher}</p>
        <p className="text-muted-foreground mb-3">{book.description}</p>
        {book.downloadUrl && (
          <a
            href={book.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors"
          >
            <Download className="h-4 w-4" />
            下载 PDF
          </a>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5" /> 目录（共 {book.chapters.length} 章）
      </h2>
      <div className="space-y-2">
        {book.chapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/books/${book.id}/chapters/${ch.id}`}
            className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-8 text-right">
                {String(ch.order).padStart(2, "0")}
              </span>
              <span className="font-medium">{ch.title}</span>
              {ch.syllabusRef && (
                <Badge variant="secondary" className="text-xs">{ch.syllabusRef}</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Dumbbell className="h-4 w-4" />
              <span>{ch._count.exercises} 题</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
