import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileQuestion, Cpu, Sigma, Languages, BookOpen, CheckCircle2, Code } from "lucide-react";

const cs408 = {
  name: "408 计算机学科专业基础综合",
  fullScore: 150,
  time: "180 分钟",
  types: [
    { name: "单项选择题", count: 40, perScore: 2, total: 80, desc: "1—40 题，每题 4 个选项" },
    { name: "综合应用题", count: 7, perScore: null, total: 70, desc: "41—47 题，含算法设计、计算分析、综合推理" },
  ],
  subjects: [
    { name: "数据结构", short: "DS", score: 45, choiceCount: 11, choiceScore: 22, compositeCount: 2, compositeScore: 25, color: "bg-purple-100 text-purple-800" },
    { name: "计算机组成原理", short: "CO", score: 45, choiceCount: 11, choiceScore: 22, compositeCount: 2, compositeScore: 21, color: "bg-orange-100 text-orange-800" },
    { name: "操作系统", short: "OS", score: 35, choiceCount: 10, choiceScore: 20, compositeCount: 2, compositeScore: 15, color: "bg-cyan-100 text-cyan-800" },
    { name: "计算机网络", short: "CN", score: 25, choiceCount: 8, choiceScore: 16, compositeCount: 1, compositeScore: 9, color: "bg-pink-100 text-pink-800" },
  ],
};

const mathOne = {
  name: "数学一",
  fullScore: 150,
  time: "180 分钟",
  types: [
    { name: "选择题", count: 10, perScore: 5, total: 50, desc: "10 题，每题 5 分" },
    { name: "填空题", count: 6, perScore: 5, total: 30, desc: "6 题，每题 5 分" },
    { name: "解答题", count: 6, perScore: null, total: 70, desc: "6 题，含证明题，共 70 分" },
  ],
  modules: [
    { name: "高等数学", score: 86, choice: 4, fill: 4, answer: 4, color: "bg-emerald-100 text-emerald-800" },
    { name: "线性代数", score: 32, choice: 3, fill: 1, answer: 1, color: "bg-blue-100 text-blue-800" },
    { name: "概率论与数理统计", score: 32, choice: 3, fill: 1, answer: 1, color: "bg-purple-100 text-purple-800" },
  ],
};

const englishOne = {
  name: "英语一",
  fullScore: 100,
  time: "180 分钟",
  types: [
    { name: "完形填空", count: 20, perScore: 0.5, total: 10 },
    { name: "阅读理解 A 节", count: 20, perScore: 2, total: 40 },
    { name: "新题型", count: 5, perScore: 2, total: 10 },
    { name: "翻译", count: 5, perScore: 2, total: 10 },
    { name: "小作文", count: 1, perScore: null, total: 10 },
    { name: "大作文", count: 1, perScore: null, total: 20 },
  ],
};

const politics = {
  name: "政治",
  fullScore: 100,
  time: "180 分钟",
  types: [
    { name: "单项选择题", count: 16, perScore: 1, total: 16 },
    { name: "多项选择题", count: 17, perScore: 2, total: 34 },
    { name: "分析题", count: 5, perScore: 10, total: 50 },
  ],
};

export default function ExamStructurePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
          <FileQuestion className="h-8 w-8 text-primary" />
          真题结构
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          四科真题题型、分值与知识点分布速查。重点看 408 和数学一，英语、政治放在下方。
        </p>
      </div>

      {/* 408 Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold">{cs408.name}</h2>
          <Badge variant="outline" className="ml-auto">{cs408.fullScore} 分 · {cs408.time}</Badge>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {cs408.types.map((t) => (
            <Card key={t.name}>
              <CardHeader>
                <CardTitle className="text-lg">{t.name}</CardTitle>
                <p className="text-3xl font-bold text-purple-600">
                  {t.total}
                  <span className="text-base font-normal text-muted-foreground ml-1">分</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.count} 题{t.perScore ? ` · 每题 ${t.perScore} 分` : ""}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-5">
            <p className="font-semibold text-sm mb-3">四科具体分布（选择题 + 综合应用题）</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cs408.subjects.map((sub) => (
                <div key={sub.name} className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">{sub.name}</span>
                    <Badge className={sub.color} variant="outline">{sub.short}</Badge>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 mb-1">{sub.score}<span className="text-xs font-normal text-muted-foreground"> 分</span></p>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <p>选择题 {sub.choiceCount} 题 / {sub.choiceScore} 分</p>
                    <p>综合题 {sub.compositeCount} 题 / {sub.compositeScore} 分</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <p>
                408 由 40 道单选题和 7 道综合应用题组成。算法设计通常以综合应用题形式出现（如 DS 第 41、42 题），
                大题分值每年可能略有调整，总体结构稳定。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 408 Code/Algorithm Question Guide */}
        <Card className="mt-6 border-l-4 border-l-purple-500 bg-purple-50/30 dark:bg-purple-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-bold">408 算法设计题（“代码题”）怎么考</h3>
            </div>

            <div className="space-y-4 text-sm">
              <div className="rounded-lg bg-background p-4 border">
                <p className="font-semibold mb-2">考察形式</p>
                <p className="text-muted-foreground leading-relaxed">
                  不是独立的编程考试，而是数据结构综合应用题中的一部分。真题通常会要求：
                  <strong>① 算法设计思想</strong>（文字说明）、
                  <strong>② 数据类型定义</strong>（如链表/树结点的 C 结构体）、
                  <strong>③ C/C++ 或伪代码实现</strong>、
                  <strong>④ 时间/空间复杂度分析</strong>。
                  写伪代码是允许的，不必写完整可编译程序。
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-background p-3 border">
                  <p className="font-semibold text-purple-700 mb-1">基础阶段</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    重点理解数据结构实现：链表插入删除、二叉树遍历、基本排序等。
                    能做到“看懂 + 能手写基础版”即可，不必大量刷算法大题。
                  </p>
                </div>
                <div className="rounded-lg bg-background p-3 border">
                  <p className="font-semibold text-purple-700 mb-1">强化阶段</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    每天或隔天做 1 道真题风格算法题。重点突破链表双指针、二叉树递归、图的 DFS/BFS。
                    这是代码题提分最快的时期。
                  </p>
                </div>
                <div className="rounded-lg bg-background p-3 border">
                  <p className="font-semibold text-purple-700 mb-1">冲刺阶段</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    反复默写高频模板，二刷真题算法题。考场策略：先写暴力解保底，再尝试最优解；
                    边界条件（空表、空树）一定要处理。
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3">
                <p className="font-semibold text-xs text-amber-900 dark:text-amber-200 mb-1">
                  关于“学完一章单独抽一天练代码题”
                </p>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  集中突破是一种方式，但不建议完全与章节学习割裂。
                  更推荐<strong>每章学完后用 1—2 道代码题收尾</strong>，既巩固本章结构，又提前熟悉大题风格；
                  强化阶段再安排整块时间系统突破真题算法题。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Math Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Sigma className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl font-bold">{mathOne.name}</h2>
          <Badge variant="outline" className="ml-auto">{mathOne.fullScore} 分 · {mathOne.time}</Badge>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {mathOne.types.map((t) => (
            <Card key={t.name}>
              <CardHeader>
                <CardTitle className="text-lg">{t.name}</CardTitle>
                <p className="text-3xl font-bold text-emerald-600">
                  {t.total}
                  <span className="text-base font-normal text-muted-foreground ml-1">分</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.count} 题{t.perScore ? ` · 每题 ${t.perScore} 分` : ""}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-5">
            <p className="font-semibold text-sm mb-3">三科题型分布（现行 2021 改革后）</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {mathOne.modules.map((m) => (
                <div key={m.name} className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">{m.name}</span>
                    <Badge className={m.color} variant="outline">{m.score} 分</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <p>选择题 {m.choice} 题</p>
                    <p>填空题 {m.fill} 题</p>
                    <p>解答题 {m.answer} 题</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <p>
                选填共 80 分，是数学一的半壁江山；解答题 70 分中高等数学约占 46 分。
                2021 年之前为旧结构（8 选择 + 6 填空 + 9 解答），刷早年真题时注意区分。
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* English & Politics */}
      <section className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-bold">{englishOne.name}</h3>
              <Badge variant="outline" className="ml-auto">{englishOne.fullScore} 分</Badge>
            </div>
            <div className="space-y-2">
              {englishOne.types.map((t) => (
                <div key={t.name} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                  <span>{t.name}</span>
                  <span className="text-muted-foreground">
                    {t.count} 题{t.perScore ? ` × ${t.perScore} 分` : ""} = {t.total} 分
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-bold">{politics.name}</h3>
              <Badge variant="outline" className="ml-auto">{politics.fullScore} 分</Badge>
            </div>
            <div className="space-y-2">
              {politics.types.map((t) => (
                <div key={t.name} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                  <span>{t.name}</span>
                  <span className="text-muted-foreground">
                    {t.count} 题{t.perScore ? ` × ${t.perScore} 分` : ""} = {t.total} 分
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
