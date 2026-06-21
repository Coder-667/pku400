import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/utils";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    downloadUrl?: string;
    _count?: { chapters: number };
  };
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base line-clamp-2">{book.title}</CardTitle>
            <div className="flex items-center gap-1 shrink-0">
              {book.downloadUrl && (
                <span className="flex items-center gap-0.5 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-1.5 py-0.5 rounded">
                  <Download className="h-3 w-3" /> PDF
                </span>
              )}
              <Badge className={CATEGORY_COLORS[book.category] || ""} variant="outline">
                {CATEGORY_LABELS[book.category] || book.category}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
          {book._count && (
            <p className="text-xs text-muted-foreground mt-2">
              {book._count.chapters} 个章节
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
