"use client";

import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ExerciseSummary {
  id: string;
  question: string;
  difficulty: string;
  tags: string;
  type: string;
}

interface ExercisePopoverProps {
  exercise: ExerciseSummary | null;
  exerciseId: string;
}

export function ExercisePopover({ exercise, exerciseId }: ExercisePopoverProps) {
  if (!exercise) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground text-xs cursor-not-allowed">
        📝 习题未找到 ({exerciseId.slice(0, 8)}...)
      </span>
    );
  }

  let tags: string[] = [];
  try {
    tags = JSON.parse(exercise.tags);
  } catch {
    tags = [];
  }

  const plainText = exercise.question
    .replace(/[#*`$\\\[\]{}|~<>_]/g, "")
    .replace(/\n/g, " ")
    .substring(0, 200);

  return (
    <HoverCard>
      <HoverCardTrigger className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-medium cursor-pointer border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
        📝 习题
      </HoverCardTrigger>
      <HoverCardContent side="top" align="center" className="w-80 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className={DIFFICULTY_COLORS[exercise.difficulty] || ""} variant="outline">
              {DIFFICULTY_LABELS[exercise.difficulty] || exercise.difficulty}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {exercise.type === "ai_generated" ? "AI生成" : "教材原题"}
            </Badge>
          </div>
          <p className="text-sm leading-relaxed line-clamp-4">{plainText}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <Link
            href={`/exercises/${exercise.id}`}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            查看完整题目与解析
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
