// ============================================================
// AI Q&A Archive — Gemini 对话 660题 1-50 题 Q&A
// 导出时间：2026-07-14
// 来源：Gemini → 导出 Google 文档 → 提取 Q&A
// 截图：public/qa-images/660-1-50/
// ============================================================
//
// 如何添加新对话：
// 1. Gemini 右上角 → "导出到 Google 文档"
// 2. 复制文档内容 → 发给 Claude
// 3. Claude 自动提取 Q&A 并添加到本文件
// 4. 重新构建部署
// ============================================================

export type QASubject = "math" | "408" | "english" | "politics" | "general";
export type QASubject408 = "ds" | "co" | "os" | "cn";

export const QA_SUBJECT_LABELS: Record<QASubject, string> = {
  math: "数学一",
  "408": "408计算机综合",
  english: "英语一",
  politics: "政治",
  general: "综合",
};

export const QA_SUBJECT_COLORS: Record<QASubject, string> = {
  math: "bg-emerald-100 text-emerald-800",
  "408": "bg-purple-100 text-purple-800",
  english: "bg-blue-100 text-blue-800",
  politics: "bg-red-100 text-red-800",
  general: "bg-gray-100 text-gray-800",
};

export const QA_408_SUB_LABELS: Record<QASubject408, string> = {
  ds: "数据结构",
  co: "组成原理",
  os: "操作系统",
  cn: "计算机网络",
};

export const QA_408_SUB_COLORS: Record<QASubject408, string> = {
  ds: "bg-purple-100 text-purple-800",
  co: "bg-orange-100 text-orange-800",
  os: "bg-cyan-100 text-cyan-800",
  cn: "bg-pink-100 text-pink-800",
};

export interface QAItem {
  id: string;
  date: string;
  subject: QASubject;
  subSubject?: QASubject408;
  topic: string;
  question: string;
  answer: string;
  tags: string[];
  isWeakPoint: boolean;
  source: string;
  images?: string[];
}

export const qaItems: QAItem[] = [
  // ============================================================
  // 第5题：泰勒展开求解极限 — a, b 待定常数
  // ============================================================
  {
    id: "660-q05-taylor",
    date: "2025-07-06",
    subject: "math",
    topic: "660题第5题 · 泰勒展开求解极限常数 a, b",
    question: "我被660题的第五题就打爆了，解答一下吧。答案给的是用泰勒展开看。",
    answer: `## 题目

求解常数 $a, b$，使得：

$$\\lim_{x \\to \\infty} \\left( \\sqrt[3]{1-x^6} - ax^2 - b \\right) = 0$$

## 第一步：变量代换，化为 $t \\to 0$

令 $t = \\frac{1}{x^2}$。当 $x \\to \\infty$ 时，$t \\to 0^+$。

$$\\sqrt[3]{1-x^6} = \\sqrt[3]{1 - \\frac{1}{t^3}} = \\frac{\\sqrt[3]{t^3 - 1}}{t} = -\\frac{1}{t}(1-t^3)^{\\frac{1}{3}}$$

原式变形为：

$$\\lim_{t \\to 0^+} \\frac{-(1-t^3)^{\\frac{1}{3}} - a - bt}{t} = 0$$

## 第二步：泰勒（麦克劳林）展开

$(1+x)^\\alpha = 1 + \\alpha x + o(x)$，令 $x = -t^3$，$\\alpha = \\frac{1}{3}$：

$$(1-t^3)^{\\frac{1}{3}} = 1 + \\frac{1}{3}(-t^3) + o(t^3) = 1 - \\frac{1}{3}t^3 + o(t^3)$$

代入：

$$\\lim_{t \\to 0^+} \\frac{-(1 - \\frac{1}{3}t^3 + o(t^3)) - a - bt}{t} = \\lim_{t \\to 0^+} \\frac{(-1-a) - bt + \\frac{1}{3}t^3 + o(t^3)}{t} = 0$$

## 第三步：系数匹配

分母是 $t$（1次方），要让分式极限为0：
- 常数项：$-1-a = 0 \\implies a = -1$
- $t$的一次项：$-b = 0 \\implies b = 0$

**答案：$a = -1$，$b = 0$**

> 最关键的一步：$x \\to \\infty$ 时，提最高次项 $x^6$ 出来，因为是三次方根，变成 $-x^2$，负号不能丢！`,
    tags: ["泰勒展开", "麦克劳林", "极限", "660题", "变量代换"],
    isWeakPoint: true,
    source: "Gemini",
    images: ["/qa-images/660-1-50/截屏2026-07-06 20.55.47.png"],
  },

  // ============================================================
  // 泰勒展开的定义与为什么用它
  // ============================================================
  {
    id: "660-why-taylor",
    date: "2025-07-06",
    subject: "math",
    topic: "为什么用泰勒展开？从定义开始讲",
    question: "先说一下为什么用泰勒展开吧，从泰勒展开的定义开始讲。",
    answer: `## 泰勒展开的本质

**底层逻辑：用一个好算的"多项式函数"去逼近一个复杂的"无理函数"。**

## 泰勒公式定义

设 $f(x)$ 在 $x_0$ 处具有 $n$ 阶导数：

$$f(x) = f(x_0) + f'(x_0)(x-x_0) + \\frac{f''(x_0)}{2!}(x-x_0)^2 + \\cdots + \\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n + R_n(x)$$

## 特例：麦克劳林公式（$x_0 = 0$）

$$f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\cdots + \\frac{f^{(n)}(0)}{n!}x^n + o(x^n)$$

## 为什么这道题"非它不可"？

| 方法 | 问题 |
|------|------|
| 洛必达 | 复合函数求导越求越复杂，根式不消失 |
| 等价无穷小 | 分子是加减法结构（含 $-bt$），盲目代换会抹掉高阶信息 |
| **泰勒展开** | 展开后所有项变成多项式加减，直接合并同类项，系数一目了然 |

> 极限题中看到复杂根式/三角函数/指数对数在分子分母中处于**加减法**结构时，泰勒展开是唯一正解。`,
    tags: ["泰勒展开", "麦克劳林", "极限方法选择"],
    isWeakPoint: false,
    source: "Gemini",
  },

  // ============================================================
  // 高阶无穷小 o(x)
  // ============================================================
  {
    id: "660-ox-meaning",
    date: "2025-07-06",
    subject: "math",
    topic: "o(x) 是什么意思？高阶无穷小的定义与运算",
    question: "o(x)是什么意思？",
    answer: `## 一句话概括

$o(x)$ 是一个"数学垃圾桶"，里面装的都是比 $x$ 趋近于 0 速度更快的、可以被忽略的小量。

## 严格定义

当 $x \\to 0$ 时，$e = o(x)$ 的意思是：

$$\\lim_{x \\to 0} \\frac{e}{x} = 0$$

举例：$x^2$ 是 $x$ 的高阶无穷小，$x^2 = o(x)$。因为 $\\frac{x^2}{x} = x \\to 0$。

## 三条运算口诀

| 规则 | 示例 |
|------|------|
| 高阶 + 低阶 = 低阶 | $x^2 + o(x^2) = o(x)$ |
| 常数倍还是垃圾桶 | $5 \\cdot o(x) = o(x)$ |
| 乘法让阶数相加 | $x \\cdot o(x) = o(x^2)$ |

## 回到第5题

分子整理出 $\\frac{1}{3}t^3 + o(t^3)$，分母是 $t$（1次方）。除以分母后：
$$\\frac{o(t^3)}{t} = o(t^2) \\to 0$$

所以 $t^3$ 以上高阶项全部消失，不需要管它们长什么样。`,
    tags: ["高阶无穷小", "o(x)", "泰勒余项"],
    isWeakPoint: false,
    source: "Gemini",
  },

  // ============================================================
  // 等价无穷小速查表
  // ============================================================
  {
    id: "660-equivalent-infinitesimals",
    date: "2025-07-06",
    subject: "math",
    topic: "x→0 等价无穷小简化式速查表",
    question: "我想到一个最经典的 ln(x+1) 可以约化为 x 的近似式子，你看看我说的对不对，再多加一些类似的极限取值在0时候的简化式。",
    answer: `## 第一层：直接约化为 $x$ 系列（乘除法中可放心使用）

| 函数 | 等价 |
|------|------|
| $\\sin x$ | $\\approx x$ |
| $\\tan x$ | $\\approx x$ |
| $\\arcsin x$ | $\\approx x$ |
| $\\arctan x$ | $\\approx x$ |
| $e^x - 1$ | $\\approx x$ |
| $\\ln(1+x)$ | $\\approx x$ |

> 注意：加减法中不能盲目代换！比如 $\\sin x - x$ 不能直接换成 $x-x=0$。

## 第二层：进阶展开式（加减法必备）

| 函数 | 展开式 |
|------|--------|
| $\\cos x$ | $\\approx 1 - \\frac{1}{2}x^2$ |
| $1 - \\cos x$ | $\\approx \\frac{1}{2}x^2$ |
| $\\sin x$ | $\\approx x - \\frac{1}{6}x^3$ |
| $\\tan x$ | $\\approx x + \\frac{1}{3}x^3$ |
| $\\tan x - \\sin x$ | $\\approx \\frac{1}{2}x^3$ |
| $(1+x)^\\alpha$ | $\\approx 1 + \\alpha x + \\frac{\\alpha(\\alpha-1)}{2}x^2$ |
| $\\sqrt{1+x}$ | $\\approx 1 + \\frac{1}{2}x - \\frac{1}{8}x^2$ |
| $\\sqrt[3]{1+x}$ | $\\approx 1 + \\frac{1}{3}x - \\frac{1}{9}x^2$ |
| $e^x$ | $\\approx 1 + x + \\frac{1}{2}x^2 + \\frac{1}{6}x^3$ |
| $\\ln(1+x)$ | $\\approx x - \\frac{1}{2}x^2 + \\frac{1}{3}x^3$ |

## "阶数对齐"心法

拿到 $\\frac{0}{0}$ 型极限题：
1. 看分母是几次幂（如 $x^3$）
2. 分子所有复杂函数必须展开到含 $x^3$ 的那一项
3. 低于分母幂次的系数必须凑成0
4. 高于分母幂次的扔进垃圾桶 $o(x^n)$`,
    tags: ["等价无穷小", "简化式", "泰勒展开", "速查表"],
    isWeakPoint: false,
    source: "Gemini",
  },

  // ============================================================
  // 洛必达 vs 泰勒 决策
  // ============================================================
  {
    id: "660-lhopital-vs-taylor",
    date: "2025-07-06",
    subject: "math",
    topic: "洛必达 vs 泰勒展开：什么时候用哪个？",
    question: "我还知道洛必达是在分子分母同时为0的极限与同时为正无穷的极限时取的，到底什么时候用洛必达什么时候用泰勒求解呢？",
    answer: `## "三看"决策法则

### 泰勒展开的绝对主场

1. **加减法 + 精细相消**：如 $\\tan x - \\sin x$，洛必达会越求越复杂
2. **高次幂分母**（$x^3, x^4$ 等）：洛必达需连续多次求导，灾难

### 洛必达的高光时刻

1. **变限积分**：$\\int_0^x \\cos t^2 dt$ → 求导直接脱积分号
2. **不能展开的函数**：$\\ln x$ 在 $x \\to 1$ 时，或 $x \\to \\infty$ 场景

## 速记口诀

> **乘除等价最优先，变限积分洛必达。加减高次用泰勒，降维打击保平安。**

## 经典对比题

$\\lim_{x \\to 0} \\frac{x - \\sin x}{x^3}$

| 方法 | 步骤 |
|------|------|
| 洛必达 | 连续洛3次：$\\frac{1-\\cos x}{3x^2} \\to \\frac{\\sin x}{6x} \\to \\frac{\\cos x}{6} = \\frac{1}{6}$ |
| 泰勒 | $\\sin x = x - \\frac{1}{6}x^3$，代入：$\\frac{x-(x-\\frac{1}{6}x^3)}{x^3} = \\frac{1}{6}$ |

泰勒一步到位。`,
    tags: ["洛必达", "泰勒展开", "极限方法", "决策树"],
    isWeakPoint: true,
    source: "Gemini",
  },

  // ============================================================
  // 第6题：分子有理化 + 等价无穷小
  // ============================================================
  {
    id: "660-q06-rationalize",
    date: "2025-07-06",
    subject: "math",
    topic: "660题第6题 · 分子有理化 + 等价无穷小 + 泰勒",
    question: "这一题答案给了分子有理化和等价无穷小替换，但是两个解法我都看不懂啊。",
    answer: `## 题目

$$\\lim_{x \\to 0} \\frac{\\sqrt{1+\\tan x} - \\sqrt{1-\\sin x}}{e^x - 1}$$

## 第一步：分母直接用等价无穷小

$e^x - 1 \\approx x$（$x \\to 0$）：

$$\\text{原式} = \\lim_{x \\to 0} \\frac{\\sqrt{1+\\tan x} - \\sqrt{1-\\sin x}}{x}$$

## 解法一：分子有理化

分子分母同乘 $\\sqrt{1+\\tan x} + \\sqrt{1-\\sin x}$：

分子 $= (1+\\tan x) - (1-\\sin x) = \\tan x + \\sin x$
分母 $= x \\cdot (\\sqrt{1+\\tan x} + \\sqrt{1-\\sin x})$

当 $x \\to 0$ 时，括号部分 $\\to 2$：

$$= \\frac{1}{2} \\lim_{x \\to 0} \\frac{\\tan x + \\sin x}{x} = \\frac{1}{2}(1 + 1) = 1$$

## 解法二：等价无穷小 — "加1减1"技巧

分子改写为：$(\\sqrt{1+\\tan x} - 1) - (\\sqrt{1-\\sin x} - 1)$

每项用 $\\sqrt{1+\\square} - 1 \\approx \\frac{1}{2}\\square$：

第一项 $\\approx \\frac{1}{2}\\tan x$，第二项 $\\approx \\frac{1}{2}(-\\sin x) = -\\frac{1}{2}\\sin x$

分子 $= \\frac{1}{2}\\tan x + \\frac{1}{2}\\sin x$，代入得 $1$。

## 泰勒展开秒杀法

$\\sqrt{1+\\tan x} \\approx 1 + \\frac{1}{2}x$，$\\sqrt{1-\\sin x} \\approx 1 - \\frac{1}{2}x$

两式直接相减：分子 $= (1 + \\frac{1}{2}x) - (1 - \\frac{1}{2}x) = x$

$$\\lim_{x \\to 0} \\frac{x}{x} = 1$$`,
    tags: ["分子有理化", "等价无穷小", "根式极限", "660题"],
    isWeakPoint: false,
    source: "Gemini",
    images: ["/qa-images/660-1-50/截屏2026-07-06 22.04.04.png"],
  },

  // ============================================================
  // 第6题追问：sinx/tanx/x 化简
  // ============================================================
  {
    id: "660-q06-followup",
    date: "2025-07-06",
    subject: "math",
    topic: "最后一步 sinx/tanx + sinx/x 的化简技巧",
    question: "我看懂了，前面其实我都反应过来了，我主要是最后一步的 sinx tanx 与 x 的化简没想到。",
    answer: `## 两种破局方式

面对 $\\lim_{x \\to 0} \\frac{\\tan x + \\sin x}{x}$：

### 方式一：分拆法（最推荐）

$$\\frac{\\tan x + \\sin x}{x} = \\frac{\\tan x}{x} + \\frac{\\sin x}{x}$$

因为 $\\lim_{x \\to 0} \\frac{\\tan x}{x} = 1$ 且 $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$：

$$\\text{原式} = 1 + 1 = 2$$

> 为什么能拆？极限四则运算铁律：只要拆开后各小极限独立存在（不是 $\\infty - \\infty$ 型），就能拆。

### 方式二：提公因式法

$$\\tan x + \\sin x = \\frac{\\sin x}{\\cos x} + \\sin x = \\sin x \\left(\\frac{1}{\\cos x} + 1\\right)$$

代回：$\\frac{\\sin x(\\frac{1}{\\cos x} + 1)}{x} = \\frac{x \\cdot 2}{x} = 2$

### 考研"最后一公里"肌肉记忆

遇到 $\\frac{f(x) \\pm g(x)}{x^n}$：
1. 优先想"能不能拆成两块"
2. 拆不开就想"能不能提公因式化为乘法"`,
    tags: ["极限技巧", "sinx/x", "分拆法", "提公因式"],
    isWeakPoint: false,
    source: "Gemini",
  },

  // ============================================================
  // 第7题：无穷大速度排行榜
  // ============================================================
  {
    id: "660-q07-infinity-ranking",
    date: "2025-07-06",
    subject: "math",
    topic: "660题第7题 · 无穷大速度排行榜 + 0·∞型",
    question: "这个化简看了一半天我都没看懂怎么做成无穷除无穷的洛必达解决的。",
    answer: `## 题目

$$I = \\lim_{x \\to +\\infty} x^{\\alpha} e^{-\\beta x} \\quad (\\alpha > 0, \\beta > 0)$$

## 第一步：把乘法变成分式（0·∞ → ∞/∞）

利用 $e^{-\\beta x} = \\frac{1}{e^{\\beta x}}$：

$$I = \\lim_{x \\to +\\infty} \\frac{x^{\\alpha}}{e^{\\beta x}}$$

分子 $x^{\\alpha} \\to +\\infty$，分母 $e^{\\beta x} \\to +\\infty$ → **$\\frac{\\infty}{\\infty}$ 型**

## 第二步：无穷大速度排行榜（直接秒杀）

$$\\ln x \\ll x^{\\alpha} \\ll a^{x} \\ll x! \\ll x^{x}$$

**指数函数的增长速度把幂函数按在地上摩擦。** 分母是"高级无穷大"，分子是"低级无穷大"，结果 = **0**。

> 答案：0

## 核心套路

看到 $0 \\cdot \\infty$ 型 → 把指数项挪到分母上（$e^{-x} \\to \\frac{1}{e^x}$）→ 立刻暴露 $\\frac{\\infty}{\\infty}$ 原型。`,
    tags: ["无穷大比较", "洛必达", "0·∞型", "660题"],
    isWeakPoint: false,
    source: "Gemini",
    images: ["/qa-images/660-1-50/截屏2026-07-06 22.10.45.png"],
  },

  // ============================================================
  // 第8题：幂指函数极限
  // ============================================================
  {
    id: "660-q08-power-exponential",
    date: "2025-07-06",
    subject: "math",
    topic: "660题第8题 · 幂指函数极限：化为 e 的底数",
    question: "这个又是怎么把这个东西化成与e的x次方相关的啊？",
    answer: `## 题目

$$\\lim_{x \\to 0} \\frac{1 - (\\cos x)^{\\sin x}}{x^3}$$

## 终极变形公式

$$u^v = e^{\\ln(u^v)} = e^{v \\ln u}$$

## 解题步骤

### 第一步：改写为 e 的底数

$$(\\cos x)^{\\sin x} = e^{\\sin x \\ln(\\cos x)}$$

分子：$1 - e^{\\sin x \\ln(\\cos x)}$

当 $x \\to 0$ 时，$\\sin x \\ln(\\cos x) \\to 0 \\cdot 0 = 0$。

利用 $e^{\\square} - 1 \\approx \\square$：

$$1 - e^{\\sin x \\ln(\\cos x)} = -(e^{\\sin x \\ln(\\cos x)} - 1) \\approx -\\sin x \\ln(\\cos x)$$

### 第二步：等价无穷小连环化简

$$\\lim_{x \\to 0} \\frac{-\\sin x \\ln(\\cos x)}{x^3}$$

- $\\sin x \\approx x$ → $\\frac{-x \\ln(\\cos x)}{x^3} = \\frac{-\\ln(\\cos x)}{x^2}$
- $\\ln(\\cos x) = \\ln(1 + (\\cos x - 1)) \\approx \\cos x - 1$
- $\\cos x - 1 \\approx -\\frac{1}{2}x^2$

### 第三步：合流

分子：$-\\ln(\\cos x) \\approx -(\\cos x - 1) \\approx \\frac{1}{2}x^2$

$$\\lim_{x \\to 0} \\frac{\\frac{1}{2}x^2}{x^2} = \\frac{1}{2}$$

> 看到 $f(x)^{g(x)}$ → 立刻化为 $e^{g(x)\\ln f(x)}$ → $e^{\\square}-1 \\approx \\square$ 脱掉 e → $\\ln(1+\\square) \\approx \\square$ 搞定对数。三连招。`,
    tags: ["幂指函数", "e指数化", "等价无穷小", "660题"],
    isWeakPoint: true,
    source: "Gemini",
    images: ["/qa-images/660-1-50/截屏2026-07-06 22.16.57.png"],
  },

  // ============================================================
  // 第13题：arctan(1/x) 左右极限 + 非零常数代入
  // ============================================================
  {
    id: "660-q13-left-right-limit",
    date: "2025-07-10",
    subject: "math",
    topic: "660题第13题 · 左右极限 + 非零常数直接代入法",
    question: "为啥第一步直接给我 arctan(1/x) 兄弟飞了？",
    answer: `## 核心原因：非零常数直接代入法

在乘除法极限中，如果某一项当 $x \\to x_0$ 时极限是一个**不为0的确定常数**，可以直接代入并提出。

$$\\lim[f(x) \\cdot g(x)] = \\lim f(x) \\cdot \\lim g(x) = A \\cdot \\lim g(x)$$

## arctan(1/x) 的分身术

| 方向 | $x \\to 0^+$ | $x \\to 0^-$ |
|------|-------------|-------------|
| $\\frac{1}{x}$ | $+\\infty$ | $-\\infty$ |
| $\\arctan\\frac{1}{x}$ | $\\frac{\\pi}{2}$ | $-\\frac{\\pi}{2}$ |

所以在 $x \\to 0^+$ 时，$\\arctan\\frac{1}{x}$ 变成了常数 $\\frac{\\pi}{2}$ 被提到极限前面。

## 必须分左右极限的三类函数

| 函数 | $x \\to 0^+$ | $x \\to 0^-$ |
|------|-------------|-------------|
| $\\arctan\\frac{1}{x}$ | $\\frac{\\pi}{2}$ | $-\\frac{\\pi}{2}$ |
| $e^{\\frac{1}{x}}$ | $+\\infty$ | $0$ |
| $\\frac{|x|}{x}$ | $1$ | $-1$ |

## 三大快速约化场景

1. **根式非零常数项**：$\\sqrt{4+x} + \\sqrt{4-x} \\to 4$（代入直接提出来）
2. **三角函数非零项**：$2+\\cos x \\to 3$（$x \\to 0$）
3. **反三角/指数趋于无穷项**：$\\arctan\\frac{1}{x} \\to \\pm\\frac{\\pi}{2}$

> 口诀：乘除结构看整体，非零常数直接提；如果是0或无穷，等价泰勒洛必达。`,
    tags: ["左右极限", "arctan", "非零代入", "660题"],
    isWeakPoint: false,
    source: "Gemini",
    images: ["/qa-images/660-1-50/截屏2026-07-10 17.56.48.png"],
  },

  // ============================================================
  // 反三角函数图像
  // ============================================================
  {
    id: "660-inverse-trig-graphs",
    date: "2025-07-10",
    subject: "math",
    topic: "反三角函数图像速记：arctan / arccot / arcsin / arccos",
    question: "arctan与arccot的图像能给我大致展示一下吗，还有arcsin的以及arccos的。",
    answer: `## 第一组：无限延伸的 arctan 与 arccot

### arctan x（反正切）

| 属性 | 值 |
|------|-----|
| 定义域 | $(-\\infty, +\\infty)$ |
| 值域 | $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$（开区间）|
| 奇偶性 | 奇函数，关于原点对称 |
| $x \\to +\\infty$ | $\\to \\frac{\\pi}{2}$ |
| $x \\to -\\infty$ | $\\to -\\frac{\\pi}{2}$ |

### arccot x（反余切）

| 属性 | 值 |
|------|-----|
| 定义域 | $(-\\infty, +\\infty)$ |
| 值域 | $(0, \\pi)$（永远是正数）|
| 单调性 | 单调递减 |
| $x \\to -\\infty$ | $\\to \\pi$ |
| $x \\to +\\infty$ | $\\to 0$ |

## 第二组：被框死的 arcsin 与 arccos

### arcsin x（反正弦）

| 属性 | 值 |
|------|-----|
| 定义域 | $[-1, 1]$ |
| 值域 | $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ |
| 奇偶性 | 奇函数 |

### arccos x（反余弦）

| 属性 | 值 |
|------|-----|
| 定义域 | $[-1, 1]$ |
| 值域 | $[0, \\pi]$ |
| 单调性 | 单调递减 |

## 速记口诀

> "正"字辈的（arctan, arcsin）：关于原点对称（奇函数）
> "余"字辈的（arccot, arccos）：住在 x 轴上方（值域为正值），单调递减`,
    tags: ["反三角函数", "arctan", "arcsin", "图像", "界限"],
    isWeakPoint: false,
    source: "Gemini",
    images: ["/qa-images/660-1-50/截屏2026-07-10 19.49.07.png"],
  },

  // ============================================================
  // 二阶导数 + 泰勒展开：∞-∞型通分
  // ============================================================
  {
    id: "660-second-derivative-taylor",
    date: "2025-07-10",
    subject: "math",
    topic: "二阶导数 + 泰勒展开 · ∞-∞型通分后相消",
    question: "我一开始想到有二次求导可能会跟泰勒展开有关，但是我不敢通分怎么办？",
    answer: `## 核心思路

题目给 $f''(a)$ 存在 → 泰勒展开的信号弹。$\\infty - \\infty$ 型必须先通分。

## 第一步：硬着头皮通分

公分母：$f'(a)(x-a)[f(x)-f(a)]$

$$\\lim_{x \\to a} \\frac{f(x)-f(a) - f'(a)(x-a)}{f'(a)(x-a)[f(x)-f(a)]}$$

## 第二步：泰勒展开

将 $f(x)$ 在 $x=a$ 处展开到二阶：

$$f(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2}(x-a)^2 + o((x-a)^2)$$

$$f(x)-f(a) = f'(a)(x-a) + \\frac{1}{2}f''(a)(x-a)^2 + o((x-a)^2)$$

## 第三步：代入，见证相消

**分子**：$f(x)-f(a) - f'(a)(x-a) = \\frac{1}{2}f''(a)(x-a)^2 + o((x-a)^2)$

$f'(a)(x-a)$ 被完美减掉了！

**分母**（只看最低次项）：$(x-a) \\cdot f'(a)(x-a) = f'(a)(x-a)^2$

## 第四步：约分求解

$$\\text{原式} = \\frac{1}{f'(a)} \\cdot \\frac{\\frac{1}{2}f''(a)(x-a)^2}{f'(a)(x-a)^2} = \\frac{f''(a)}{2[f'(a)]^2}$$

> 题里有高阶导数条件 → 闭眼通分 → 泰勒展开 → 大项必相消。`,
    tags: ["泰勒展开", "二阶导数", "通分", "∞-∞型"],
    isWeakPoint: true,
    source: "Gemini",
    images: ["/qa-images/660-1-50/截屏2026-07-10 18.18.30.png"],
  },

  // ============================================================
  // 第17题：定积分定义 + ln/e 本质
  // ============================================================
  {
    id: "660-q17-definite-integral",
    date: "2025-07-10",
    subject: "math",
    topic: "660题第17题 · 定积分定义 + ln与e的本质",
    question: "这个题我想到要用ln，但是我一开始没反应过来。在讲解完这个题之后你重新告诉我ln以及e的定义。",
    answer: `## 题目

$$A = \\lim_{n \\to \\infty} \\left[\\left(1+\\frac{1}{n}\\right)\\left(1+\\frac{2}{n}\\right)\\ldots\\left(1+\\frac{n}{n}\\right)\\right]^{\\frac{1}{n}}$$

## 第一步：取对数

$$\\ln A = \\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{i=1}^{n} \\ln\\left(1+\\frac{i}{n}\\right)$$

## 第二步：识别定积分定义

$$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{i=1}^{n} f\\left(\\frac{i}{n}\\right) = \\int_0^1 f(x) dx$$

$$\\ln A = \\int_0^1 \\ln(1+x) dx$$

## 第三步：分部积分

令 $u = \\ln(1+x)$，$dv = dx$：

$$\\ln A = (1+x)\\ln(1+x)\\Big|_0^1 - \\int_0^1 1 dx = 2\\ln 2 - 1 = \\ln 4 - \\ln e = \\ln\\frac{4}{e}$$

$$A = \\frac{4}{e}$$

## ln 与 e 的本质定义

### ln x 的定义：从面积出发

$$\\ln x \\triangleq \\int_1^x \\frac{1}{t} dt \\quad (x > 0)$$

- $\\ln 1 = 0$（积分区间为 [1,1]，面积 = 0）
- $x \\in (0,1)$ 时 $\\ln x < 0$（积分方向反转）

### e 的定义：那个"天选之数"

使得 $\\frac{1}{t}$ 从1开始围成的面积刚好等于1的那个右边界就是 e：

$$\\int_1^e \\frac{1}{t} dt = 1 \\implies \\ln e = 1$$

等价极限定义：$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$

### 为什么 $u^v = e^{v\\ln u}$ 总能奏效？

因为 ln 和 e 互为反函数，拿 ln 把连乘/高次幂拆成加法，拿 e 收拢回去。`,
    tags: ["定积分定义", "ln定义", "e定义", "分部积分", "660题"],
    isWeakPoint: true,
    source: "Gemini",
    images: ["/qa-images/660-1-50/截屏2026-07-10 19.28.30.png"],
  },
];

/** Get all unique subjects that have Q&A items */
export function getQASubjects(): QASubject[] {
  const subjects = new Set(qaItems.map((q) => q.subject));
  return Array.from(subjects);
}

/** Get Q&A items filtered by subject */
export function getQABySubject(subject: QASubject): QAItem[] {
  return qaItems
    .filter((q) => q.subject === subject)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Get all weak point items */
export function getWeakPoints(): QAItem[] {
  return qaItems
    .filter((q) => q.isWeakPoint)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Group Q&A items by subject for display */
export function getQAGroupedBySubject(): Record<QASubject, QAItem[]> {
  const result: Record<string, QAItem[]> = {};
  for (const subject of getQASubjects()) {
    result[subject] = getQABySubject(subject);
  }
  return result as Record<QASubject, QAItem[]>;
}
