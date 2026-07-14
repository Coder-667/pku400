import Link from "next/link";
import { ChevronRight, MessageSquare, AlertTriangle, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  qaItems,
  getQAGroupedBySubject,
  getWeakPoints,
  QA_SUBJECT_LABELS,
  QA_SUBJECT_COLORS,
  QA_408_SUB_LABELS,
  QA_408_SUB_COLORS,
  type QASubject,
  type QASubject408,
} from "@/data/qa-items";

export default function QAListPage() {
  const grouped = getQAGroupedBySubject();
  const weakPoints = getWeakPoints();

  const subjectOrder: QASubject[] = ["408", "math", "english", "politics", "general"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
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

      {/* Import Guide */}
      <Card className="mb-8 border-border bg-muted/30">
        <CardContent className="p-4 text-sm space-y-2">
          <p className="font-semibold">
            如何导入 Gemini 对话？
          </p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>
              打开{" "}
              <a
                href="https://takeout.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Google Takeout <ExternalLink className="h-3 w-3" />
              </a>
              ，选择 <strong>Gemini</strong> → 导出
            </li>
            <li>下载 ZIP 解压，找到 JSON 文件</li>
            <li>
              将问答内容按格式添加到{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">data/qa-items.ts</code>
            </li>
            <li>重新构建部署即可</li>
          </ol>
        </CardContent>
      </Card>

      {/* Weak Points Alert */}
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

      {/* Q&A by Subject */}
      <div className="space-y-8">
        {subjectOrder.map((subject) => {
          const items = grouped[subject];
          if (!items || items.length === 0) return null;

          return (
            <div key={subject}>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Badge className={QA_SUBJECT_COLORS[subject]} variant="outline">
                  {QA_SUBJECT_LABELS[subject]}
                </Badge>
                <span className="text-sm text-muted-foreground font-normal">
                  {items.length} 条问答
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {items.map((item) => (
                  <Link key={item.id} href={`/qa/${item.id}`}>
                    <Card className="hover:shadow-sm hover:border-primary/30 transition-colors cursor-pointer h-full">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.subSubject && (
                            <Badge
                              className={QA_408_SUB_COLORS[item.subSubject]}
                              variant="outline"
                            >
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
