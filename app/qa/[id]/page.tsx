import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  qaItems,
  QA_SUBJECT_LABELS,
  QA_SUBJECT_COLORS,
  QA_408_SUB_LABELS,
  QA_408_SUB_COLORS,
} from "@/data/qa-items";

export function generateStaticParams() {
  return qaItems.map((item) => ({ id: item.id }));
}

interface QADetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function QADetailPage({ params }: QADetailPageProps) {
  const { id } = await params;
  const item = qaItems.find((q) => q.id === id);

  if (!item) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">首页</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/qa" className="hover:text-foreground">AI问答归档</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground truncate max-w-[200px]">{item.topic}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge className={QA_SUBJECT_COLORS[item.subject]} variant="outline">
            {QA_SUBJECT_LABELS[item.subject]}
          </Badge>
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
          <Badge variant="secondary">{item.source}</Badge>
          <span className="text-xs text-muted-foreground">{item.date}</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{item.topic}</h1>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6 p-5 rounded-lg border bg-card">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">提问</h2>
        <div className="text-sm leading-relaxed">
          <MarkdownRenderer content={item.question} />
        </div>
      </div>

      {/* Original Screenshots */}
      {item.images && item.images.length > 0 && (
        <div className="mb-6 p-5 rounded-lg border bg-muted/30">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            题目截图
          </h2>
          <div className="space-y-3">
            {item.images.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={`题目截图 ${i + 1}`}
                className="w-full rounded-lg border"
              />
            ))}
          </div>
        </div>
      )}

      {/* Answer */}
      <div className="mb-8 p-5 rounded-lg border bg-green-50/50 dark:bg-green-950/20">
        <h2 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-3">回答</h2>
        <div className="text-sm leading-relaxed">
          <MarkdownRenderer content={item.answer} />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="pt-6 border-t">
        <Link
          href="/qa"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> 返回问答列表
        </Link>
      </div>
    </div>
  );
}
