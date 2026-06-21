import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const tools = [
  {
    name: "thea.study",
    url: "https://thea.study",
    description: "AI驱动的学习平台，支持知识点问答、习题生成、概念解释等功能",
  },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">工具</h1>
      <p className="text-muted-foreground mb-8">备考辅助工具链接与使用建议</p>

      <div className="grid md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <a key={tool.url} href={tool.url} target="_blank" rel="noopener noreferrer">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
