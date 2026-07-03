import { TrendingUp, Target, AlertTriangle, Shield, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  admissionHistory,
  retestInfo,
  target400,
  tierTargets,
  target408SubSubjects,
  targetMathModules,
  trendAnalysis,
} from "@/lib/admission-data";

export default function ScoresPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          分数线与<span className="text-primary">目标拆解</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          北大软微 085400 电子信息（11408）历年录取数据 + 目标400分各科拆解
        </p>
      </div>

      {/* ========== Section 1: 历年分数线趋势 ========== */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" /> 历年复试线与录取数据
      </h2>

      {/* Trend Summary */}
      <Card className="mb-6 border-l-4 border-l-red-500">
        <CardContent className="p-5">
          <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">趋势预警</p>
          <p className="text-sm text-muted-foreground">{trendAnalysis.summary}</p>
        </CardContent>
      </Card>

      {/* Data Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border rounded-lg">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-semibold">考研年份</th>
              <th className="text-left p-3 font-semibold">初试日期</th>
              <th className="text-left p-3 font-semibold">复试线</th>
              <th className="text-left p-3 font-semibold">单科线</th>
              <th className="text-left p-3 font-semibold">录取人数</th>
              <th className="text-left p-3 font-semibold">录取最低</th>
              <th className="text-left p-3 font-semibold">录取最高</th>
              <th className="text-left p-3 font-semibold">录取平均</th>
              <th className="text-left p-3 font-semibold">录取中位</th>
              <th className="text-left p-3 font-semibold">报考人数</th>
            </tr>
          </thead>
          <tbody>
            {admissionHistory.map((r, i) => (
              <tr
                key={r.year}
                className={`border-t hover:bg-muted/30 transition-colors ${
                  i === admissionHistory.length - 1 ? "bg-primary/5 font-medium" : ""
                }`}
              >
                <td className="p-3">{r.year}考研</td>
                <td className="p-3 text-muted-foreground">{r.examDate}</td>
                <td className="p-3">
                  <Badge
                    className={
                      r.retestLine >= 380
                        ? "bg-red-100 text-red-800"
                        : r.retestLine >= 365
                          ? "bg-orange-100 text-orange-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                    variant="outline"
                  >
                    {r.retestLine}分
                  </Badge>
                </td>
                <td className="p-3 text-muted-foreground">{r.singleSubjectLine}</td>
                <td className="p-3">{r.enrolledCount}人</td>
                <td className="p-3">{r.lowestAdmit}</td>
                <td className="p-3 text-emerald-600 font-medium">{r.highestAdmit}</td>
                <td className="p-3 font-bold">{r.avgAdmit}</td>
                <td className="p-3">{r.medianAdmit}</td>
                <td className="p-3 text-muted-foreground">{r.applicantCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trend Insight */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-5">
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-1">分数趋势</p>
            <p className="text-sm text-muted-foreground">{trendAnalysis.warning}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-5">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">备考建议</p>
            <p className="text-sm text-muted-foreground">{trendAnalysis.advice}</p>
          </CardContent>
        </Card>
      </div>

      {/* ========== Section 2: 400分目标拆解 ========== */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" /> 目标400分各科拆解
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        总分 = 政治70 + 英语一75 + 数学一130 + 408综合125。这是一套经过验证的可行分配方案。
      </p>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {target400.map((t) => (
          <Card key={t.subject} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.subject}</CardTitle>
                <Badge variant="outline">{t.fullScore}分</Badge>
              </div>
              <p className="text-3xl font-bold text-primary">{t.targetScore}</p>
              <p className="text-xs text-muted-foreground">
                目标得分率 {t.targetRate}% · 允许丢分 {t.lossAllowed}分
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.strategy}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ========== Section 3: 三档目标对照 ========== */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" /> 三档目标对照
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        根据自身基础和备考时间，选择合适的分数目标。建议以400分为目标备考，即使打折也能守住复试线。
      </p>

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border rounded-lg">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-semibold">总分目标</th>
              <th className="text-left p-3 font-semibold">政治</th>
              <th className="text-left p-3 font-semibold">英语一</th>
              <th className="text-left p-3 font-semibold">数学一</th>
              <th className="text-left p-3 font-semibold">408综合</th>
              <th className="text-left p-3 font-semibold">定位</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tierTargets).map(([total, subjects]) => (
              <tr key={total} className="border-t hover:bg-muted/30">
                <td className="p-3">
                  <Badge
                    className={
                      total === "400"
                        ? "bg-red-100 text-red-800"
                        : total === "390"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                    variant="outline"
                  >
                    {total}分
                  </Badge>
                </td>
                {subjects.map((s) => (
                  <td key={s.subject} className="p-3 font-medium">
                    {s.score}
                  </td>
                ))}
                <td className="p-3 text-xs text-muted-foreground">
                  {total === "400"
                    ? "稳录取"
                    : total === "390"
                      ? "较稳妥"
                      : "进复试"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========== Section 4: 408子科目目标 ========== */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <ArrowUpRight className="h-5 w-5 text-primary" /> 408子科目目标拆解（合计125分）
      </h2>
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {target408SubSubjects.map((sub) => (
          <Card key={sub.name} size="sm" className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{sub.name}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {sub.fullScore}分
                </Badge>
              </div>
              <p className="text-2xl font-bold text-primary">
                {sub.targetScore}
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  /{sub.fullScore}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">目标得分率 {sub.targetRate}%</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {sub.keyPoints.map((kp) => (
                  <li key={kp} className="text-xs text-muted-foreground flex items-start gap-1">
                    <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-primary/60 inline-block" />
                    {kp}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ========== Section 5: 数学一子模块目标 ========== */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <ArrowUpRight className="h-5 w-5 text-primary" /> 数学一子模块目标拆解（合计130分）
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {targetMathModules.map((mod) => (
          <Card key={mod.name} size="sm" className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{mod.name}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {mod.fullScore}分
                </Badge>
              </div>
              <p className="text-2xl font-bold text-primary">
                {mod.targetScore}
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  /{mod.fullScore}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">目标得分率 {mod.targetRate}%</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {mod.keyPoints.map((kp) => (
                  <li key={kp} className="text-xs text-muted-foreground flex items-start gap-1">
                    <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-primary/60 inline-block" />
                    {kp}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ========== Section 6: 复试说明 ========== */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" /> 复试：不能忽视的40%
      </h2>
      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">权重与公式</h3>
              <p className="text-sm text-muted-foreground mb-2">
                初试 {retestInfo.weight.initial}% : 复试 {retestInfo.weight.retest}%
              </p>
              <p className="text-sm font-mono bg-muted p-3 rounded-lg">{retestInfo.formula}</p>
              <p className="text-xs text-muted-foreground mt-2">
                复录比：{retestInfo.ratio}。2024年198人进复试，约240-300人参加复试。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">复试构成与关键数据</h3>
              <p className="text-sm text-muted-foreground">{retestInfo.description}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">{retestInfo.note}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
