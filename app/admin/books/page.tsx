"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/utils";
import { Plus, Edit3, Trash2, Loader2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  _count: { chapters: number };
}

export default function AdminBooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", author: "", publisher: "", category: "ds", description: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/books").then(r => r.json()).then(setBooks).finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.author) return;
    setSubmitting(true);
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    setForm({ title: "", author: "", publisher: "", category: "ds", description: "" });
    router.refresh();
    const data = await fetch("/api/books").then(r => r.json());
    setBooks(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    setBooks(books.filter(b => b.id !== id));
  };

  if (loading) return <div className="container mx-auto px-4 py-8 max-w-4xl"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">书籍管理</h1>

      <Card className="mb-8">
        <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> 添加书籍</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">书名 *</Label>
              <Input id="title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="《数据结构（C语言版）》" />
            </div>
            <div>
              <Label htmlFor="author">作者 *</Label>
              <Input id="author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} placeholder="严蔚敏" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="publisher">出版社</Label>
              <Input id="publisher" value={form.publisher} onChange={e => setForm({...form, publisher: e.target.value})} placeholder="清华大学出版社" />
            </div>
            <div>
              <Label htmlFor="category">分类</Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
              >
                <option value="politics">政治</option>
                <option value="english">英语一</option>
                <option value="math_one">数学一</option>
                <option value="ds">数据结构</option>
                <option value="co">计算机组成原理</option>
                <option value="os">操作系统</option>
                <option value="cn">计算机网络</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="description">简介</Label>
            <Textarea id="description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} />
          </div>
          <Button onClick={handleCreate} disabled={submitting || !form.title || !form.author}>
            {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> 添加中</> : <><Plus className="h-4 w-4 mr-2" /> 添加</>}
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">现有书籍（{books.length} 本）</h2>
      <div className="space-y-2">
        {books.map(book => (
          <div key={book.id} className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium truncate">{book.title}</span>
                <Badge className={CATEGORY_COLORS[book.category]} variant="outline">{CATEGORY_LABELS[book.category]}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{book.author} · {book._count.chapters} 章节</p>
            </div>
            <div className="flex gap-2 ml-4 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => router.push(`/books/${book.id}`)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(book.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
