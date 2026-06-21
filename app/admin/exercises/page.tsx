"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/utils";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface Exercise {
  id: string;
  question: string;
  difficulty: string;
  type: string;
  tags: string;
  chapter: { title: string; book: { title: string; id: string } } | null;
}

export default function AdminExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    chapterId: "", question: "", answer: "", explanation: "", difficulty: "medium", tags: "", type: "textbook", source: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const loadExercises = async () => {
    const data = await fetch("/api/exercises").then(r => r.json());
    setExercises(data);
    setLoading(false);
  };

  useEffect(() => { loadExercises(); }, []);

  const handleCreate = async () => {
    if (!form.chapterId || !form.question) return;
    setSubmitting(true);
    await fetch("/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      }),
    });
    setSubmitting(false);
    setForm({ chapterId: "", question: "", answer: "", explanation: "", difficulty: "medium", tags: "", type: "textbook", source: "" });
    await loadExercises();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/exercises/${id}`, { method: "DELETE" });
    setExercises(exercises.filter(e => e.id !== id));
  };

  if (loading) return <div className="container mx-auto px-4 py-8 max-w-4xl"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">习题管理</h1>

      <Card className="mb-8">
        <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> 手动添加习题</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="chapterId">章节ID *</Label>
              <Input id="chapterId" value={form.chapterId} onChange={e => setForm({...form, chapterId: e.target.value})} placeholder="从章节URL获取" />
            </div>
            <div>
              <Label htmlFor="difficulty">难度</Label>
              <select
                id="difficulty"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.difficulty}
                onChange={e => setForm({...form, difficulty: e.target.value})}
              >
                <option value="easy">基础</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
            <div>
              <Label htmlFor="tags">标签（逗号分隔）</Label>
              <Input id="tags" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="二叉树, 遍历" />
            </div>
          </div>
          <div>
            <Label htmlFor="question">题目（Markdown格式）*</Label>
            <Textarea id="question" value={form.question} onChange={e => setForm({...form, question: e.target.value})} rows={5} placeholder="支持LaTeX公式，如 $f(x) = wx + b$" />
          </div>
          <div>
            <Label htmlFor="answer">答案（Markdown格式）</Label>
            <Textarea id="answer" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} rows={4} />
          </div>
          <div>
            <Label htmlFor="explanation">解析（Markdown格式）</Label>
            <Textarea id="explanation" value={form.explanation} onChange={e => setForm({...form, explanation: e.target.value})} rows={4} />
          </div>
          <div>
            <Label htmlFor="source">来源</Label>
            <Input id="source" value={form.source} onChange={e => setForm({...form, source: e.target.value})} placeholder="《数据结构》严蔚敏 第6章习题" />
          </div>
          <Button onClick={handleCreate} disabled={submitting || !form.chapterId || !form.question}>
            {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> 添加中</> : <><Plus className="h-4 w-4 mr-2" /> 添加习题</>}
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">现有习题（{exercises.length} 题）</h2>
      <div className="space-y-2">
        {exercises.map(ex => {
          let tags: string[] = [];
          try { tags = JSON.parse(ex.tags); } catch { tags = []; }
          const plainText = ex.question.replace(/[#*`$\\\[\]{}|~<>]/g, "").substring(0, 100);
          return (
            <div key={ex.id} className="flex items-start justify-between p-4 rounded-lg border">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm text-muted-foreground mb-1">{ex.chapter?.book?.title} · {ex.chapter?.title}</p>
                <p className="font-medium text-sm line-clamp-2">{plainText}</p>
                <div className="flex gap-1.5 mt-2">
                  <Badge className={DIFFICULTY_COLORS[ex.difficulty]} variant="outline">{DIFFICULTY_LABELS[ex.difficulty]}</Badge>
                  <Badge variant="secondary">{ex.type === "ai_generated" ? "AI生成" : "教材原题"}</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(ex.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
