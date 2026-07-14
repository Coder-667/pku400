import Link from "next/link";
import { ChevronRight, ExternalLink, BookOpen, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXAM_YEARS, getAvailableYears, getYearStats } from "@/data/exam-questions";

export default function ExamListPage() {
  const availableYears = getAvailableYears();
  const availableSet = new Set(availableYears);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          408 历年真题刷题
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          2009-2026年计算机学科专业基础综合统考真题，支持选择交互、即时判对错、进度持久化
        </p>
      </div>

      {/* External platform links */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <ExternalLink className="h-4 w-4" /> 外部真题平台
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              name: "王道计算机考研",
              desc: "小程序 · 18年真题 + 课后习题",
              url: "#",
              note: "微信搜索「王道计算机考研」",
            },
            {
              name: "橙啦计算机考研",
              desc: "小程序 · AI批改 + 学情分析",
              url: "#",
              note: "微信搜索「橙啦计算机考研」",
            },
            {
              name: "竹一道来408",
              desc: "小程序 · 免费刷题 + AI答疑",
              url: "#",
              note: "微信搜索「竹一道来408」",
            },
            {
              name: "码虫刷题",
              desc: "App · 真题 + 模拟 + 择校",
              url: "#",
              note: "App Store 搜「码虫刷题」",
            },
          ].map((platform) => (
            <div
              key={platform.name}
              className="rounded-lg border p-3 text-sm space-y-1"
            >
              <p className="font-semibold">{platform.name}</p>
              <p className="text-xs text-muted-foreground">{platform.desc}</p>
              <p className="text-xs text-primary">{platform.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Year grid */}
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4" /> 真题年份
        {availableYears.length < EXAM_YEARS.length && (
          <span className="text-xs text-muted-foreground font-normal">
            （已录入 {availableYears.length}/{EXAM_YEARS.length} 年，持续更新中）
          </span>
        )}
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
        {EXAM_YEARS.map((year) => {
          const hasData = availableSet.has(year);
          const stats = hasData ? getYearStats(year) : null;

          return (
            <Link
              key={year}
              href={hasData ? `/408/exam/${year}` : "#"}
              className={!hasData ? "pointer-events-none" : ""}
            >
              <Card
                className={`text-center transition-colors ${
                  hasData
                    ? "hover:border-primary hover:shadow-sm cursor-pointer"
                    : "opacity-40"
                }`}
              >
                <CardContent className="p-4 space-y-1">
                  <p className="text-lg font-bold">{year}</p>
                  {hasData && stats ? (
                    <div className="space-y-0.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {stats.total}题
                      </Badge>
                    </div>
                  ) : (
                    <p className="text-[10px] text-muted-foreground">即将上线</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Note */}
      <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">说明</p>
        <p>本页面真题数据仅供个人学习参考使用，题目来源为全国硕士研究生招生考试计算机学科专业基础综合（408）历年试题。</p>
        <p>答题进度保存在浏览器本地存储中，清除浏览器数据会导致进度丢失。</p>
        <p>
          如需完整真题数据，推荐使用
          <Link href="/tools" className="text-primary underline mx-1">
            外部工具
          </Link>
          或微信小程序（王道/橙啦/竹一道来等）。
        </p>
      </div>
    </div>
  );
}
