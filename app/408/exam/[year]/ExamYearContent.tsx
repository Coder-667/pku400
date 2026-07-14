"use client";

import { useState, useCallback, use } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChoiceQuiz } from "@/components/ChoiceQuiz";
import { CompositeQuiz } from "@/components/CompositeQuiz";
import { QuizProgress, resetYearProgress } from "@/components/QuizProgress";
import {
  getQuestionsByYear,
  getYearStats,
  SUBJECT_LABELS,
  SUBJECT_COLORS,
  type ExamSubject,
} from "@/data/exam-questions";

interface ExamYearContentProps {
  params: Promise<{ year: string }>;
}

export function ExamYearContent({ params }: ExamYearContentProps) {
  const { year: yearStr } = use(params);
  const year = parseInt(yearStr, 10);

  const questions = getQuestionsByYear(year);
  const stats = getYearStats(year);

  const [activeSubject, setActiveSubject] = useState<ExamSubject | "all">("all");
  const [key, setKey] = useState(0);

  const handleResetYear = useCallback(() => {
    resetYearProgress(year);
    setKey((k) => k + 1);
  }, [year]);

  const filteredQuestions =
    activeSubject === "all"
      ? questions
      : questions.filter((q) => q.subject === activeSubject);

  const choiceQuestions = filteredQuestions.filter((q) => q.type === "choice");
  const compositeQuestions = filteredQuestions.filter((q) => q.type === "composite");

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">{year}年真题</h1>
        <p className="text-muted-foreground mb-6">该年份的真题数据尚未录入</p>
        <Link
          href="/408/exam"
          className="text-primary hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> 返回真题列表
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl" key={key}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/408" className="hover:text-foreground">
          408
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/408/exam" className="hover:text-foreground">
          历年真题
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{year}年</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{year}年408统考真题</h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{stats.total} 题</Badge>
          <Badge variant="secondary">{stats.choice} 选择</Badge>
          <Badge variant="secondary">{stats.composite} 综合应用</Badge>
          {Object.entries(stats.bySubject).map(
            ([sub, count]) =>
              count > 0 && (
                <Badge
                  key={sub}
                  className={SUBJECT_COLORS[sub as ExamSubject]}
                  variant="outline"
                >
                  {SUBJECT_LABELS[sub as ExamSubject]}: {count}题
                </Badge>
              )
          )}
        </div>
      </div>

      {/* Progress bar + filters */}
      <QuizProgress
        questions={questions}
        year={year}
        activeSubject={activeSubject}
        onSubjectChange={setActiveSubject}
        onResetYear={handleResetYear}
      />

      {/* Choice questions */}
      {choiceQuestions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            选择题
            <span className="text-sm text-muted-foreground font-normal ml-2">
              （共{choiceQuestions.length}题，每题2分）
            </span>
          </h2>
          <div className="space-y-4">
            {choiceQuestions.map((q) => (
              <ChoiceQuiz key={q.id} question={q} year={year} />
            ))}
          </div>
        </div>
      )}

      {/* Composite questions */}
      {compositeQuestions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            综合应用题
            <span className="text-sm text-muted-foreground font-normal ml-2">
              （共{compositeQuestions.length}题）
            </span>
          </h2>
          <div className="space-y-4">
            {compositeQuestions.map((q) => (
              <CompositeQuiz key={q.id} question={q} />
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {filteredQuestions.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>该科目下暂无题目数据</p>
        </div>
      )}

      {/* Bottom nav */}
      <div className="mt-8 pt-6 border-t flex justify-between">
        <Link
          href="/408/exam"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> 返回真题列表
        </Link>
        {year > 2009 && (
          <Link
            href={`/408/exam/${year - 1}`}
            className="text-sm text-primary hover:underline"
          >
            ← {year - 1}年真题
          </Link>
        )}
        {year < 2026 && (
          <Link
            href={`/408/exam/${year + 1}`}
            className="text-sm text-primary hover:underline"
          >
            {year + 1}年真题 →
          </Link>
        )}
      </div>
    </div>
  );
}
