import Link from "next/link";
import { MessageSquare, AlertTriangle, ExternalLink, ArrowRight, Sigma, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  qaItems,
  getQABySubject,
  getWeakPointsBySubject,
  QA_SUBJECT_LABELS,
  QA_SUBJECT_COLORS,
  type QASubject,
} from "@/data/qa-items";

const subjectCards: {
  subject: QASubject;
  icon: typeof Sigma;
  description: string;
}[] = [
  {
    subject: "math",
    icon: Sigma,
    description: "660题极限计算、泰勒展开、等价无穷小、洛必达法则、反三角函数等",
  },
  {
    subject: "408",
    icon: Cpu,
    description: "香农信息论、C语言基础、指针、栈帧、内存管理、递归等",
  },
];

export default function QAHubPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3 flex items-center justify-center gap-2">
          <MessageSquare className="h-7 w-7 text-primary" />
          AI 问答归档
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          从 Gemini、Claude 等 AI 工具中保存的问答记录，按科目整理，方便复习查阅
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid gap-4 mb-10">
        {subjectCards.map(({ subject, icon: Icon, description }) => {
          const items = getQABySubject(subject);
          const weakPoints = getWeakPointsBySubject(subject);
          if (items.length === 0) return null;

          return (
            <Link key={subject} href={`/qa/subject/${subject}`}>
              <Card className="hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${subject === "math" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                          {QA_SUBJECT_LABELS[subject]}
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform" />
                        </h2>
                        <p className="text-sm text-muted-foreground mb-3 max-w-md">
                          {description}
                        </p>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-muted-foreground">
                            共 <strong className="text-foreground">{items.length}</strong> 条问答
                          </span>
                          {weakPoints.length > 0 && (
                            <span className="text-amber-600 inline-flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              <strong>{weakPoints.length}</strong> 个薄弱点
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* All Weak Points Summary */}
      {(() => {
        const mathWeak = getWeakPointsBySubject("math");
        const csWeak = getWeakPointsBySubject("408");

        return (
          <Card className="mb-8 border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="font-semibold text-sm text-amber-800 dark:text-amber-300">
                  全部薄弱点（{mathWeak.length + csWeak.length} 个）
                </span>
              </div>

              {mathWeak.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">
                    {QA_SUBJECT_LABELS.math}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {mathWeak.map((item) => (
                      <Link key={item.id} href={`/qa/${item.id}`}>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer transition-colors">
                          {item.topic}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {csWeak.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">
                    {QA_SUBJECT_LABELS["408"]}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {csWeak.map((item) => (
                      <Link key={item.id} href={`/qa/${item.id}`}>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer transition-colors">
                          {item.topic}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })()}

      {/* Import Guide */}
      <Card className="border-border bg-muted/30">
        <CardContent className="p-4 text-sm space-y-2">
          <p className="font-semibold">如何导入 Gemini 对话？</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>
              Gemini 右上角 → "导出到 Google 文档"
            </li>
            <li>
              将文档内容发给 Claude，自动提取 Q&A 并添加到{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">data/qa-items.ts</code>
            </li>
            <li>重新构建部署即可</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
