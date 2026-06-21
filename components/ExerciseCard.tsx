import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/utils";

interface ExerciseCardProps {
  exercise: {
    id: string;
    question: string;
    difficulty: string;
    type: string;
    tags: string;
    chapter?: { title: string; book?: { title: string } } | null;
  };
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  let tags: string[] = [];
  try {
    tags = JSON.parse(exercise.tags);
  } catch {
    tags = [];
  }

  const plainText = exercise.question
    .replace(/[#*`$\\\[\]{}|~<>]/g, "")
    .replace(/\n/g, " ")
    .substring(0, 120);

  return (
    <Link href={`/exercises/${exercise.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm line-clamp-2 font-medium">
              {exercise.chapter?.book?.title && (
                <span className="text-muted-foreground text-xs block mb-1">
                  {exercise.chapter.book.title} · {exercise.chapter?.title}
                </span>
              )}
              <span>{plainText}</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            <Badge className={DIFFICULTY_COLORS[exercise.difficulty] || ""} variant="outline">
              {DIFFICULTY_LABELS[exercise.difficulty] || exercise.difficulty}
            </Badge>
            <Badge variant="secondary">
              {exercise.type === "ai_generated" ? "AI生成" : "教材原题"}
            </Badge>
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
