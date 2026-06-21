import Link from "next/link";
import { BookOpen, Dumbbell, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">管理后台</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/admin/books">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">书籍管理</h3>
                <p className="text-sm text-muted-foreground">添加/编辑/删除参考书目和章节</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/exercises">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Dumbbell className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">习题管理</h3>
                <p className="text-sm text-muted-foreground">手动录入/编辑/删除习题</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/ai-generate">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">AI 生成习题</h3>
                <p className="text-sm text-muted-foreground">输入知识点，AI自动出题</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
