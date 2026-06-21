import Link from "next/link";
import { BookOpen, Dumbbell, FileText, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mathParts = [
  { name: "高等数学", score: "约82分", weight: "约55%", color: "bg-emerald-100 text-emerald-800" },
  { name: "线性代数", score: "约34分", weight: "约23%", color: "bg-blue-100 text-blue-800" },
  { name: "概率论与数理统计", score: "约34分", weight: "约22%", color: "bg-purple-100 text-purple-800" },
];

const calcTopics = [
  "函数、极限、连续",
  "一元函数微分学（导数、微分中值定理）",
  "一元函数积分学（不定积分、定积分、反常积分）",
  "多元函数微分学（偏导数、全微分、极值）",
  "多元函数积分学（二重积分、三重积分、曲线积分、曲面积分）",
  "无穷级数（数项级数、幂级数、傅里叶级数）",
  "常微分方程",
];

const laTopics = [
  "行列式与矩阵运算",
  "向量组的线性相关性",
  "线性方程组（齐次/非齐次）",
  "特征值与特征向量",
  "二次型（标准型、正定性）",
];

const probTopics = [
  "随机事件与概率",
  "一维随机变量及其分布",
  "多维随机变量及其分布",
  "数字特征（期望、方差、协方差）",
  "大数定律与中心极限定理",
  "数理统计（参数估计、假设检验）",
];

export default function MathPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          数学<span className="text-primary"> 一 </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          数学一是考研数学中范围最广的一门，包含高等数学、线性代数、概率论与数理统计三个科目，总分150分
        </p>
      </div>

      {/* Syllabus Overview */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" /> 试卷结构（150分）
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {mathParts.map((part) => (
          <Card key={part.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{part.name}</CardTitle>
                <Badge className={part.color} variant="outline">{part.weight}</Badge>
              </div>
              <p className="text-2xl font-bold text-primary">{part.score}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Topic Checklists */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-500" /> 高等数学
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {calcTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                {topic}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" /> 线性代数
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {laTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                {topic}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-500" /> 概率论与数理统计
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {probTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/books">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">浏览书目</h3>
                <p className="text-sm text-muted-foreground">教材 + 习题集</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/exercises">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Dumbbell className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">刷题练习</h3>
                <p className="text-sm text-muted-foreground">历年真题 + AI生成题</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/ai-generate">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">AI 生成习题</h3>
                <p className="text-sm text-muted-foreground">输入知识点 · 自动出题</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
