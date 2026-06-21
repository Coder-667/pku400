import { BookOpen, Dumbbell, Sparkles, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">管理后台</h1>

      <Card className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-200 mb-1">管理功能仅在本地开发环境可用</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                当前为静态托管版本（GitHub Pages）。如需使用书籍管理、习题管理、AI生成习题等功能，请在本地运行：
              </p>
              <code className="block mt-2 p-2 rounded bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-sm">
                cd pku400 && npm run dev
              </code>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                然后访问 <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">http://localhost:3000/admin</code>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4 opacity-60">
        <Card className="h-full">
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">书籍管理</h3>
              <p className="text-sm text-muted-foreground">添加/编辑/删除参考书目和章节</p>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <Dumbbell className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">习题管理</h3>
              <p className="text-sm text-muted-foreground">手动录入/编辑/删除习题</p>
            </div>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">AI 生成习题</h3>
              <p className="text-sm text-muted-foreground">输入知识点，AI自动出题</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
