"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChapterContent } from "@/components/ChapterContent";
import { ExerciseCard } from "@/components/ExerciseCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, BookOpen, Pencil } from "lucide-react";

interface ExerciseSummary {
  id: string;
  question: string;
  difficulty: string;
  tags: string;
  type: string;
}

interface ChapterTabsProps {
  chapterId: string;
  content: string;
  exercises: ExerciseSummary[];
}

export function ChapterTabs({ chapterId, content, exercises }: ChapterTabsProps) {
  const [tab, setTab] = useState("read");
  const [editOpen, setEditOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [saving, setSaving] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/chapters/${chapterId}/content`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    });
    if (res.ok) {
      setCurrentContent(editContent);
      setEditOpen(false);
    }
    setSaving(false);
  };

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="read">
            <BookOpen className="h-4 w-4" />
            阅读模式
          </TabsTrigger>
          <TabsTrigger value="exercises">
            <Dumbbell className="h-4 w-4" />
            习题列表（共 {exercises.length} 题）
          </TabsTrigger>
        </TabsList>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setEditContent(currentContent);
            setEditOpen(true);
          }}
        >
          <Pencil className="h-4 w-4" />
          编辑内容
        </Button>
      </div>

      <TabsContent value="read">
        <ChapterContent content={currentContent} exercises={exercises} />
      </TabsContent>

      <TabsContent value="exercises">
        {exercises.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">暂无习题，可前往管理页添加</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </TabsContent>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑章节内容</DialogTitle>
            <DialogDescription>
              使用 Markdown 格式编辑章节原文。用 <code className="bg-muted px-1 rounded">[📝习题ID]</code> 标记嵌入习题。
            </DialogDescription>
          </DialogHeader>
          <Textarea
            className="min-h-80 font-mono text-sm"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="输入章节原文（Markdown 格式）..."
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "保存中..." : "保存"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
