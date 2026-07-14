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
import { recordAnswer } from "./QuizProgress";

interface ChoiceQuizProps {
  question: ExamQuestion;
  year: number;
  onAnswered?: (isCorrect: boolean) => void;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export function ChoiceQuiz({ question, year, onAnswered }: ChoiceQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = useCallback(
    (optionLabel: string) => {
      if (showResult) return;
      const isCorrect = optionLabel === question.answer;
      setSelected(optionLabel);
      setShowResult(true);
      recordAnswer(year, question.id, optionLabel, isCorrect);
      onAnswered?.(isCorrect);
    },
    [showResult, question, year, onAnswered]
  );

  const handleRetry = useCallback(() => {
    setSelected(null);
    setShowResult(false);
  }, []);

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
      </div>

      {/* Question */}
      <div className="text-sm leading-relaxed">
        <MarkdownRenderer content={question.question} />
      </div>

      {/* Options */}
      <div className="space-y-2">
        {question.options?.map((option, i) => {
          const label = OPTION_LABELS[i];
          const isSelected = selected === label;
          const isCorrectOption = label === question.answer;

          let optionClass = "border rounded-lg p-3 text-sm cursor-pointer transition-colors ";
          if (!showResult) {
            optionClass +=
              "hover:border-primary hover:bg-primary/5";
          } else if (isCorrectOption) {
            optionClass +=
              "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200";
          } else if (isSelected && !isCorrectOption) {
            optionClass +=
              "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200";
          } else {
            optionClass += "opacity-60";
          }

          return (
            <div
              key={label}
              onClick={() => handleSelect(label)}
              className={optionClass}
            >
              <span className="font-semibold mr-2">{label}.</span>
              <MarkdownRenderer content={option.replace(/^[A-D]\.\s*/, "")} />
            </div>
          );
        })}
      </div>

      {/* Result */}
      {showResult && (
        <div
          className={`rounded-md p-4 text-sm ${
            selected === question.answer
              ? "bg-green-50 dark:bg-green-950/30 border border-green-200"
              : "bg-red-50 dark:bg-red-950/30 border border-red-200"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">
              {selected === question.answer ? "✓ 回答正确" : "✗ 回答错误"}
            </p>
            {selected !== question.answer && (
              <button
                onClick={handleRetry}
                className="text-xs text-primary hover:underline"
              >
                重新作答
              </button>
            )}
          </div>
          <p className="text-muted-foreground mb-1">
            正确答案：<span className="font-semibold">{question.answer}</span>
          </p>
          <div className="mt-2 pt-2 border-t border-border/50">
            <p className="font-semibold text-xs mb-1">解析</p>
            <MarkdownRenderer content={question.explanation} />
          </div>
        </div>
      )}
    </div>
  );
}
