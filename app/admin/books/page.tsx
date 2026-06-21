import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function AdminBooksPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">书籍管理</h1>
      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-200 mb-1">书籍管理功能仅在本地开发环境可用</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                请运行 <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">npm run dev</code> 后在本地使用此功能。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
