"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import {
  SUBJECT_LABELS,
  SUBJECT_COLORS,
  type ExamSubject,
  type ExamQuestion,
} from "@/data/exam-questions";

interface QuizRecord {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  timestamp: number;
}

interface YearProgress {
  records: QuizRecord[];
  updatedAt: number;
}

interface QuizProgressData {
  total: number;
  answered: number;
  correct: number;
  bySubject: Record<ExamSubject, { total: number; answered: number; correct: number }>;
}

function loadProgress(year: number): YearProgress {
  if (typeof window === "undefined") return { records: [], updatedAt: 0 };
  try {
    const raw = localStorage.getItem(`exam-408-${year}`);
    return raw ? JSON.parse(raw) : { records: [], updatedAt: 0 };
  } catch {
    return { records: [], updatedAt: 0 };
  }
}

function saveProgress(year: number, progress: YearProgress) {
  if (typeof window === "undefined") return;
  progress.updatedAt = Date.now();
  localStorage.setItem(`exam-408-${year}`, JSON.stringify(progress));
}

export function getQuizProgress(
  questions: ExamQuestion[],
  year: number
): QuizProgressData {
  const progress = loadProgress(year);
  const recordMap = new Map(progress.records.map((r) => [r.questionId, r]));

  const total = questions.length;
  let answered = 0;
  let correct = 0;
  const bySubject: QuizProgressData["bySubject"] = {
    ds: { total: 0, answered: 0, correct: 0 },
    co: { total: 0, answered: 0, correct: 0 },
    os: { total: 0, answered: 0, correct: 0 },
    cn: { total: 0, answered: 0, correct: 0 },
  };

  for (const q of questions) {
    bySubject[q.subject].total++;
    const record = recordMap.get(q.id);
    if (record) {
      answered++;
      bySubject[q.subject].answered++;
      if (record.isCorrect) {
        correct++;
        bySubject[q.subject].correct++;
      }
    }
  }

  return { total, answered, correct, bySubject };
}

export function recordAnswer(
  year: number,
  questionId: string,
  selectedOption: string,
  isCorrect: boolean
) {
  const progress = loadProgress(year);
  const existing = progress.records.findIndex((r) => r.questionId === questionId);
  const record: QuizRecord = {
    questionId,
    selectedOption,
    isCorrect,
    timestamp: Date.now(),
  };
  if (existing >= 0) {
    progress.records[existing] = record;
  } else {
    progress.records.push(record);
  }
  saveProgress(year, progress);
}

export function resetYearProgress(year: number) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`exam-408-${year}`);
}

export function resetAllProgress() {
  if (typeof window === "undefined") return;
  const keys = Object.keys(localStorage).filter((k) => k.startsWith("exam-408-"));
  keys.forEach((k) => localStorage.removeItem(k));
}

interface QuizProgressProps {
  questions: ExamQuestion[];
  year: number;
  activeSubject: ExamSubject | "all";
  onSubjectChange: (subject: ExamSubject | "all") => void;
  onResetYear: () => void;
}

const ALL_SUBJECTS: Array<ExamSubject | "all"> = ["all", "ds", "co", "os", "cn"];

export function QuizProgress({
  questions,
  year,
  activeSubject,
  onSubjectChange,
  onResetYear,
}: QuizProgressProps) {
  const [progress, setProgress] = useState<QuizProgressData>({
    total: 0,
    answered: 0,
    correct: 0,
    bySubject: { ds: { total: 0, answered: 0, correct: 0 }, co: { total: 0, answered: 0, correct: 0 }, os: { total: 0, answered: 0, correct: 0 }, cn: { total: 0, answered: 0, correct: 0 } },
  });
  const [showReset, setShowReset] = useState(false);

  const refreshProgress = useCallback(() => {
    setProgress(getQuizProgress(questions, year));
  }, [questions, year]);

  useEffect(() => {
    refreshProgress();
    const onStorage = (e: StorageEvent) => {
      if (e.key === `exam-408-${year}`) refreshProgress();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refreshProgress, year]);

  const pct = progress.total > 0 ? Math.round((progress.answered / progress.total) * 100) : 0;
  const correctPct = progress.answered > 0 ? Math.round((progress.correct / progress.answered) * 100) : 0;

  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {progress.answered}/{progress.total} 已答
          </span>
          {progress.answered > 0 && (
            <span className="text-sm text-muted-foreground">
              正确率 {correctPct}%（{progress.correct}/{progress.answered}）
            </span>
          )}
        </div>
        <button
          onClick={() => setShowReset(!showReset)}
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
        >
          重置
        </button>
      </div>

      {showReset && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <span className="text-xs text-destructive">确定要清除该年份的所有答题记录？</span>
          <button
            onClick={() => {
              onResetYear();
              setShowReset(false);
              refreshProgress();
            }}
            className="text-xs rounded bg-destructive px-2 py-0.5 text-white hover:bg-destructive/90"
          >
            确认重置
          </button>
          <button
            onClick={() => setShowReset(false)}
            className="text-xs rounded border px-2 py-0.5"
          >
            取消
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Subject filter chips */}
      <div className="flex flex-wrap gap-1.5">
        {ALL_SUBJECTS.map((sub) => {
          const isActive = activeSubject === sub;
          const label = sub === "all" ? "全部" : SUBJECT_LABELS[sub];
          const stat =
            sub === "all"
              ? progress
              : progress.bySubject[sub as ExamSubject];

          return (
            <button
              key={sub}
              onClick={() => onSubjectChange(sub)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {label}
              <span className="opacity-70">
                {stat.answered}/{stat.total}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
