import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_LABELS: Record<string, string> = {
  politics: "政治",
  english: "英语一",
  math_one: "数学一",
  ds: "数据结构",
  co: "计算机组成原理",
  os: "操作系统",
  cn: "计算机网络",
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "基础",
  medium: "中等",
  hard: "困难",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export const CATEGORY_COLORS: Record<string, string> = {
  politics: "bg-red-100 text-red-800",
  english: "bg-blue-100 text-blue-800",
  math_one: "bg-emerald-100 text-emerald-800",
  ds: "bg-purple-100 text-purple-800",
  co: "bg-orange-100 text-orange-800",
  os: "bg-cyan-100 text-cyan-800",
  cn: "bg-pink-100 text-pink-800",
};
