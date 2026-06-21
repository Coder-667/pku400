"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GeneratedExercise {
  title: string;
  question: string;
  answer: string;
  explanation: string;
  difficulty: string;
  tags: string[];
}

export default function AIGeneratePage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(3);
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GeneratedExercise[] | null>(null);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [chapterId, setChapterId] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch("/api/generate-exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count, difficulty }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResults(data.exercises);
    } catch (err) {
      alert(err instanceof Error ? err.message : "生成失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (exercise: GeneratedExercise, index: number) => {
    if (!chapterId) {
      alert("请先输入章节ID（可从章节详情页URL获取）");
      return;
    }
    setSavingIndex(index);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterId,
          type: "ai_generated",
          question: `## ${exercise.title}\n\n${exercise.question}`,
          answer: exercise.answer,
          explanation: exercise.explanation,
          difficulty: exercise.difficulty,
          tags: exercise.tags,
          source: "AI生成",
        }),
      });
      if (!res.ok) throw new Error("保存失败");
      alert("保存成功！");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSavingIndex(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Sparkles className="h-7 w-7 text-primary" /> AI 生成习题
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>生成参数</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="topic">知识点</Label>
            <Textarea
              id="topic"
              placeholder="输入知识点，例如：二叉树的遍历算法（先序、中序、后序、层序）及其非递归实现"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="count">题目数量</Label>
              <Input
                id="count"
                type="number"
                min={1}
                max={10}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="difficulty">难度</Label>
              <select
                id="difficulty"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">基础</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
            <div>
              <Label htmlFor="chapterId">保存到章节ID</Label>
              <Input
                id="chapterId"
                placeholder="章节ID"
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={loading || !topic.trim()} className="w-full">
            {loading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> 生成中...</>
            ) : (
              <><Sparkles className="h-4 w-4 mr-2" /> 生成习题</>
            )}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">生成结果（{results.length} 题）</h2>
          {results.map((ex, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{ex.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{ex.difficulty === "easy" ? "基础" : ex.difficulty === "medium" ? "中等" : "困难"}</Badge>
                      {ex.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSave(ex, i)}
                    disabled={savingIndex === i}
                  >
                    {savingIndex === i ? (
                      <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> 保存中</>
                    ) : (
                      <><Save className="h-3 w-3 mr-1" /> 保存</>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">题目</h4>
                  <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md whitespace-pre-wrap">{ex.question}</div>
                </div>
                {ex.answer && (
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2">答案</h4>
                    <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md whitespace-pre-wrap">{ex.answer}</div>
                  </div>
                )}
                {ex.explanation && (
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-2">解析</h4>
                    <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md whitespace-pre-wrap">{ex.explanation}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
