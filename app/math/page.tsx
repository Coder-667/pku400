"use client";

import { useState } from "react";
import { FileText, Target, ChevronDown, BookOpen, Lightbulb, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { targetMathModules } from "@/lib/admission-data";

const mathParts = [
  { name: "高等数学", score: "约82分", target: 72, weight: "约55%", color: "bg-emerald-100 text-emerald-800" },
  { name: "线性代数", score: "约34分", target: 29, weight: "约23%", color: "bg-blue-100 text-blue-800" },
  { name: "概率论与数理统计", score: "约34分", target: 29, weight: "约22%", color: "bg-purple-100 text-purple-800" },
];

const topicGroups = [
  {
    subject: "高等数学",
    color: "text-emerald-600",
    dot: "bg-emerald-500",
    topics: [
      { text: "函数、极限、连续", freq: "high" },
      { text: "一元函数微分学（导数、微分中值定理）", freq: "high" },
      { text: "一元函数积分学（不定积分、定积分、反常积分）", freq: "high" },
      { text: "多元函数微分学（偏导数、全微分、极值）", freq: "high" },
      { text: "多元函数积分学（二重积分、三重积分、曲线积分、曲面积分）", freq: "high" },
      { text: "无穷级数（数项级数、幂级数、傅里叶级数）", freq: "high" },
      { text: "常微分方程", freq: "mid" },
    ],
  },
  {
    subject: "线性代数",
    color: "text-blue-600",
    dot: "bg-blue-500",
    topics: [
      { text: "行列式与矩阵运算", freq: "high" },
      { text: "向量组的线性相关性", freq: "high" },
      { text: "线性方程组（齐次/非齐次）", freq: "high" },
      { text: "特征值与特征向量", freq: "high" },
      { text: "二次型（标准型、正定性）", freq: "mid" },
    ],
  },
  {
    subject: "概率论与数理统计",
    color: "text-purple-600",
    dot: "bg-purple-500",
    topics: [
      { text: "随机事件与概率", freq: "mid" },
      { text: "一维随机变量及其分布", freq: "high" },
      { text: "多维随机变量及其分布", freq: "high" },
      { text: "数字特征（期望、方差、协方差）", freq: "high" },
      { text: "大数定律与中心极限定理", freq: "low" },
      { text: "数理统计（参数估计、假设检验）", freq: "high" },
    ],
  },
];

const freqBadge: Record<string, { label: string; className: string }> = {
  high: { label: "高频", className: "bg-red-100 text-red-700" },
  mid: { label: "中频", className: "bg-yellow-100 text-yellow-700" },
  low: { label: "低频", className: "bg-gray-100 text-gray-600" },
};

const studyPaths = [
  {
    name: "主流路径：基础→强化→真题",
    summary: "张宇30讲/武忠祥基础 → 660+880 → 张宇36讲/强化 → 真题 → 模拟卷",
    pros: "体系完整，由浅入深，适合大多数考生。",
    cons: "周期较长，需要3—6个月完成基础+强化。",
  },
  {
    name: "题海驱动：以练带学",
    summary: "直接刷880/1000题，遇到不会的章节回头补张宇30讲或强化课",
    pros: "能快速暴露薄弱点，适合有一定基础或二战考生。",
    cons: "容易卡在高难度综合题上，基础概念可能不扎实。",
  },
  {
    name: "选择填空专项：660为主",
    summary: "660题反复刷2—3遍，重点练客观题速度和准确率",
    pros: "数学一选填占80分，性价比极高。",
    cons: "大题步骤和综合应用训练不足，需配合880或真题补充。",
  },
];

export default function MathPage() {
  const totalTarget = targetMathModules.reduce((sum, m) => sum + m.targetScore, 0);
  const [showTopics, setShowTopics] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          数学<span className="text-primary"> 一 </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          数学一是考研数学中范围最广的一门，包含高等数学、线性代数、概率论与数理统计三个科目，总分150分 · 目标{totalTarget}分
        </p>
      </div>

      {/* Syllabus Overview */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" /> 试卷结构（150分）· 目标{totalTarget}分
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {mathParts.map((part) => (
          <Card key={part.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{part.name}</CardTitle>
                <Badge className={part.color} variant="outline">{part.weight}</Badge>
              </div>
              <p className="text-2xl font-bold text-primary">
                <span className="text-base font-normal text-muted-foreground">目标</span> {part.target}
              </p>
              <p className="text-xs text-muted-foreground">
                满分{part.score} · 目标得分率 {Math.round((part.target / parseInt(part.score)) * 100)}%
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Score Strategy */}
      <Card className="mb-10 border-l-4 border-l-primary">
        <CardContent className="p-5">
          <p className="font-bold text-sm mb-2">130分得分策略</p>
          <p className="text-sm text-muted-foreground">
            选择题10题50分，目标44+（错≤2题）；填空题6题30分，目标24+（错≤1题）；解答题6题70分（含证明题1题），目标52+。
            高数是重头戏（82分），线代和概率各34分但相对规律性强，要力争各拿29+。
          </p>
        </CardContent>
      </Card>

      {/* Collapsible Topic Checklists */}
      <div className="mb-10">
        <button
          type="button"
          onClick={() => setShowTopics((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-left font-semibold transition-colors hover:bg-accent"
        >
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            三科考点清单
          </span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showTopics ? "rotate-180" : ""}`} />
        </button>

        {showTopics && (
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {topicGroups.map((group) => (
              <div key={group.subject}>
                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${group.color}`}>
                  <span className={`h-2 w-2 rounded-full ${group.dot}`} />
                  {group.subject}
                </h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {group.topics.map((topic) => (
                    <div key={topic.text} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                      <span className={`h-1.5 w-1.5 rounded-full ${group.dot} shrink-0`} />
                      {topic.text}
                      <Badge className={`text-[10px] ml-auto ${freqBadge[topic.freq].className}`} variant="outline">
                        {freqBadge[topic.freq].label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Study Path & Experience Summary */}
      <Card className="mb-10 border-l-4 border-l-emerald-500">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-bold">经验贴与路径参考</h2>
          </div>

          <div className="rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 mb-5">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-amber-900 dark:text-amber-200 mb-1">针对你目前的计划：880 → 张宇30讲 → 660 → 真题</p>
                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  这个顺序略偏「题海驱动」。880 的综合题需要一定基础，如果直接开头可能会比较吃力。
                  更稳妥的调整是：<strong>张宇30讲与880同步进行</strong>——学完一讲就做 880 对应章节，把30讲当作「查缺补漏手册」；
                  660 作为选填专项穿插其中；最后预留 <strong>至少 2 个月</strong> 做真题（建议近15年，近3年留作全真模拟）。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-5">
            {studyPaths.map((path) => (
              <div key={path.name} className="rounded-lg bg-muted/50 p-4">
                <p className="font-semibold text-sm mb-1">{path.name}</p>
                <p className="text-sm text-muted-foreground mb-2">{path.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">优点：{path.pros}</span>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">缺点：{path.cons}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <p>
              经验贴共识：数学一 130 分的关键不在刷题数量，而在<strong>错题重做</strong>和<strong>计算准确率</strong>。
              建议每周固定半天回顾本周错题，而不是一味推进新题。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
