"use client";

import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  SUBJECT_LABELS,
  SUBJECT_COLORS,
  DIFFICULTY_LABELS,
  type ExamQuestion,
} from "@/data/exam-questions";
import { ChevronDown } from "lucide-react";

interface CompositeQuizProps {
  question: ExamQuestion;
}

export function CompositeQuiz({ question }: CompositeQuizProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleAnswer = useCallback(() => setShowAnswer((v) => !v), []);
  const toggleExplanation = useCallback(
    () => setShowExplanation((v) => !v),
    []
  );

  return (
    <div className="rounded-lg border p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-mono text-muted-foreground">
          第{question.number}题
        </span>
        <Badge className={SUBJECT_COLORS[question.subject]} variant="outline">
          {SUBJECT_LABELS[question.subject]}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {DIFFICULTY_LABELS[question.difficulty]}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {question.topic}
        </Badge>
        <Badge className="bg-blue-100 text-blue-800 text-xs" variant="outline">
          综合应用题
        </Badge>
      </div>

      {/* Question */}
      <div className="text-sm leading-relaxed">
        <MarkdownRenderer content={question.question} />
      </div>

      {/* Toggle Answer */}
      <button
        onClick={toggleAnswer}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            showAnswer ? "rotate-0" : "-rotate-90"
          }`}
        />
        {showAnswer ? "收起答案" : "查看答案"}
      </button>

      {showAnswer && (
        <div className="rounded-md border bg-green-50/50 dark:bg-green-950/20 p-4">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">
            参考答案
          </p>
          <div className="text-sm">
            <MarkdownRenderer content={question.answer} />
          </div>
        </div>
      )}

      {/* Toggle Explanation */}
      <button
        onClick={toggleExplanation}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            showExplanation ? "rotate-0" : "-rotate-90"
          }`}
        />
        {showExplanation ? "收起解析" : "查看解析"}
      </button>

      {showExplanation && (
        <div className="rounded-md border bg-blue-50/50 dark:bg-blue-950/20 p-4">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
            详细解析
          </p>
          <div className="text-sm">
            <MarkdownRenderer content={question.explanation} />
          </div>
        </div>
      )}
    </div>
  );
}
