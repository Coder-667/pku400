"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { ExercisePopover } from "./ExercisePopover";

interface ExerciseSummary {
  id: string;
  question: string;
  difficulty: string;
  tags: string;
  type: string;
}

interface ChapterContentProps {
  content: string;
  exercises: ExerciseSummary[];
}

const MARKER_REGEX = /\[📝([^\]]+)\]/g;

export function ChapterContent({ content, exercises }: ChapterContentProps) {
  const exerciseMap = useMemo(() => {
    const map = new Map<string, ExerciseSummary>();
    for (const ex of exercises) {
      map.set(ex.id, ex);
    }
    return map;
  }, [exercises]);

  const segments = useMemo(() => {
    const parts: Array<{ type: "text"; text: string } | { type: "exercise"; id: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = MARKER_REGEX.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", text: content.slice(lastIndex, match.index) });
      }
      parts.push({ type: "exercise", id: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({ type: "text", text: content.slice(lastIndex) });
    }

    return parts;
  }, [content]);

  if (!content) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg mb-2">教材内容待录入</p>
        <p className="text-sm">请通过管理后台编辑章节内容，使用 <code className="bg-muted px-1 rounded">[📝习题ID]</code> 标记嵌入习题</p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      {segments.map((seg, i) => {
        if (seg.type === "exercise") {
          const exercise = exerciseMap.get(seg.id) ?? null;
          return <ExercisePopover key={i} exercise={exercise} exerciseId={seg.id} />;
        }
        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {seg.text}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
