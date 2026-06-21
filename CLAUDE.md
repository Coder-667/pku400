# PKU400 — 北大软微11408备考资料库

## 项目概述

北大软微085400电子信息专业11408考研备考网站，技术栈与842-exam-prep一致。

### 路由结构

| 路由 | 说明 |
|------|------|
| `/` | 主页面：倒计时（至2026-12-19 08:30 CST）+ 专业信息框 + 五科规划卡片（政治/英语一/数学一/408） |
| `/408` | 408专属页：试卷结构（150分，4门各约25%）、四科考点清单（DS/CO/OS/CN）、三阶段路径 |
| `/math` | 数学一专题页：试卷结构（高数82/线代34/概率34）、三科考点清单 |
| `/books` | 书目列表，7个分类Tab（政治/英语一/数学一/数据结构/组成原理/操作系统/计算机网络） |
| `/books/[id]` | 书目详情，章节目录树 |
| `/books/[id]/chapters/[chapterId]` | 章节阅读模式 + 习题列表双Tab，支持编辑章节内容 |
| `/exercises` | 习题列表 |
| `/exercises/[id]` | 习题详情，KaTeX渲染 |
| `/admin` | 管理后台入口 |
| `/admin/ai-generate` | AI生成习题（Claude API） |
| `/admin/books` | 书籍CRUD |
| `/admin/exercises` | 习题CRUD |
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
