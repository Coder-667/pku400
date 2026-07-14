import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, AlertTriangle, Sigma, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getQABySubject,
  getWeakPointsBySubject,
  QA_SUBJECT_LABELS,
  QA_SUBJECT_COLORS,
  QA_408_SUB_LABELS,
  QA_408_SUB_COLORS,
  type QASubject,
} from "@/data/qa-items";

const VALID_SUBJECTS: QASubject[] = ["math", "408"];

const subjectIcons: Record<string, typeof Sigma> = {
  math: Sigma,
  "408": Cpu,
};

export function generateStaticParams() {
  return VALID_SUBJECTS.map((subject) => ({ subject }));
}

interface SubjectPageProps {
  params: Promise<{ subject: string }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subject } = await params;

  if (!VALID_SUBJECTS.includes(subject as QASubject)) notFound();

  const s = subject as QASubject;
  const items = getQABySubject(s);
  const weakPoints = getWeakPointsBySubject(s);
  const Icon = subjectIcons[subject] ?? Sigma;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">首页</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/qa" className="hover:text-foreground">AI问答归档</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{QA_SUBJECT_LABELS[s]}</span>
      </div>

      {/* Subject Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-3 rounded-xl ${s === "math" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{QA_SUBJECT_LABELS[s]}</h1>
          <p className="text-sm text-muted-foreground">
            共 {items.length} 条问答
            {weakPoints.length > 0 && (
              <span className="text-amber-600 ml-3 inline-flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                {weakPoints.length} 个薄弱点
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Weak Points Section */}
      {weakPoints.length > 0 && (
        <Card className="mb-8 border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span className="font-semibold text-sm text-amber-800 dark:text-amber-300">
                薄弱点（{weakPoints.length} 个）
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {weakPoints.map((item) => (
                <Link key={item.id} href={`/qa/${item.id}`}>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer transition-colors">
                    {item.topic}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Q&A List */}
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link key={item.id} href={`/qa/${item.id}`}>
            <Card className="hover:shadow-sm hover:border-primary/30 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.subSubject && (
                    <Badge className={QA_408_SUB_COLORS[item.subSubject]} variant="outline">
                      {QA_408_SUB_LABELS[item.subSubject]}
                    </Badge>
                  )}
                  {item.isWeakPoint && (
                    <Badge className="bg-amber-100 text-amber-700" variant="outline">
                      薄弱点
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="font-semibold text-sm leading-snug line-clamp-2">
                  {item.topic}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {item.question}
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Back nav */}
      <div className="pt-8 mt-8 border-t">
        <Link
          href="/qa"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> 返回问答归档
        </Link>
      </div>
    </div>
  );
}
