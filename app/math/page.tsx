import Link from "next/link";
import { BookOpen, FileText, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { targetMathModules } from "@/lib/admission-data";

const mathParts = [
  { name: "高等数学", score: "约82分", target: 72, weight: "约55%", color: "bg-emerald-100 text-emerald-800" },
  { name: "线性代数", score: "约34分", target: 29, weight: "约23%", color: "bg-blue-100 text-blue-800" },
  { name: "概率论与数理统计", score: "约34分", target: 29, weight: "约22%", color: "bg-purple-100 text-purple-800" },
];

const calcTopics = [
  { text: "函数、极限、连续", freq: "high" },
  { text: "一元函数微分学（导数、微分中值定理）", freq: "high" },
  { text: "一元函数积分学（不定积分、定积分、反常积分）", freq: "high" },
  { text: "多元函数微分学（偏导数、全微分、极值）", freq: "high" },
  { text: "多元函数积分学（二重积分、三重积分、曲线积分、曲面积分）", freq: "high" },
  { text: "无穷级数（数项级数、幂级数、傅里叶级数）", freq: "high" },
  { text: "常微分方程", freq: "mid" },
];

const laTopics = [
  { text: "行列式与矩阵运算", freq: "high" },
  { text: "向量组的线性相关性", freq: "high" },
  { text: "线性方程组（齐次/非齐次）", freq: "high" },
  { text: "特征值与特征向量", freq: "high" },
  { text: "二次型（标准型、正定性）", freq: "mid" },
];

const probTopics = [
  { text: "随机事件与概率", freq: "mid" },
  { text: "一维随机变量及其分布", freq: "high" },
  { text: "多维随机变量及其分布", freq: "high" },
  { text: "数字特征（期望、方差、协方差）", freq: "high" },
  { text: "大数定律与中心极限定理", freq: "low" },
  { text: "数理统计（参数估计、假设检验）", freq: "high" },
];

const freqBadge: Record<string, { label: string; className: string }> = {
  high: { label: "高频", className: "bg-red-100 text-red-700" },
  mid: { label: "中频", className: "bg-yellow-100 text-yellow-700" },
  low: { label: "低频", className: "bg-gray-100 text-gray-600" },
};

export default function MathPage() {
  const totalTarget = targetMathModules.reduce((sum, m) => sum + m.targetScore, 0);

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

      {/* Topic Checklists */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-500" /> 高等数学
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {calcTopics.map((topic) => (
              <div key={topic.text} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                {topic.text}
                <Badge className={`text-[10px] ml-auto ${freqBadge[topic.freq].className}`} variant="outline">
                  {freqBadge[topic.freq].label}
                </Badge>
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
              <div key={topic.text} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                {topic.text}
                <Badge className={`text-[10px] ml-auto ${freqBadge[topic.freq].className}`} variant="outline">
                  {freqBadge[topic.freq].label}
                </Badge>
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
              <div key={topic.text} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                {topic.text}
                <Badge className={`text-[10px] ml-auto ${freqBadge[topic.freq].className}`} variant="outline">
                  {freqBadge[topic.freq].label}
                </Badge>
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
        <Link href="/scores">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">分数线</h3>
                <p className="text-sm text-muted-foreground">历年数据 + 目标拆解</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
