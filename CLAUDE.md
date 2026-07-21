# PKU400 — 北大软微11408备考资料库

## 项目概述

北大软微085400电子信息专业11408考研备考网站，技术栈与842-exam-prep一致。

### 路由结构

| 路由 | 说明 |
|------|------|
| `/` | 主页面：倒计时 + 考研大事记 + 400分目标拆解 + 四科规划卡片 |
| `/408` | 408专属页：试卷结构、四科考点清单、三阶段路径、问答归档入口 |
| `/math` | 数学一专题页：试卷结构、三科考点清单 |
| `/scores` | 历年分数线与目标拆解 |
| `/qa` | AI问答归档入口 |
| `/qa/subject/[subject]` | 按科目（math / 408）筛选的问答列表 |
| `/qa/[id]` | 单条问答详情 |
| `/tools` | 外部工具链接 |

## 数据模型

### Book 分类
- `politics` — 政治
- `english` — 英语一
- `math_one` — 数学一
- `ds` — 数据结构
- `co` — 计算机组成原理
- `os` — 操作系统
- `cn` — 计算机网络

## 技术栈

- **框架**: Next.js 16.2.6 App Router (Turbopack)
- **ORM**: Prisma 7.8.0（强制使用adapter模式）
- **数据库**: SQLite本地开发 / Turso (libsql) 生产
- **UI**: shadcn/ui v4（基于 `@base-ui/react`，使用 `render` prop）
- **样式**: Tailwind CSS v4（`@import "tailwindcss"` 语法）
- **数学渲染**: react-markdown + remark-math + rehype-katex
- **AI**: Anthropic SDK (Claude Sonnet 4.6)
- **部署**: Vercel

## shadcn v4 (base-ui) 注意事项

- **不使用 `asChild`**：base-ui使用 `render` prop
- **Tabs必须包裹在Root内**：`<Tabs>` 提供context
- **HoverCard**：基于base-ui PreviewCard

## 关键文件

- `prisma/schema.prisma` — 数据模型
- `lib/prisma.ts` — 双模式Prisma客户端
- `lib/claude.ts` — Claude API调用（408辅导专家prompt）
- `lib/utils.ts` — CATEGORY_LABELS/COLORS 映射（7分类）
- `prisma/seed.ts` — 10本书、62章节、3样题
