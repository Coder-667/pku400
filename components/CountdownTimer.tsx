"use client";

import { useState, useEffect } from "react";

export function CountdownTimer() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Target: 2026-12-19 08:30:00 CST (UTC+8)
  const target = new Date("2026-12-19T08:30:00+08:00");

  if (!now) {
    return (
      <div className="flex items-center justify-center gap-4 text-center">
        {["天", "时", "分", "秒"].map((label) => (
          <div key={label} className="min-w-[72px]">
            <span className="text-5xl md:text-6xl font-mono font-bold tabular-nums text-foreground">
              --
            </span>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>
    );
  }

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return (
      <p className="text-3xl font-bold text-primary">
        考试加油！
      </p>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const segments = [
    { value: days, label: "天" },
    { value: hours, label: "时" },
    { value: minutes, label: "分" },
    { value: seconds, label: "秒" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-5">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-center gap-3 md:gap-5">
          <div className="text-center min-w-[64px] md:min-w-[80px]">
            <span className="text-5xl md:text-7xl font-mono font-bold tabular-nums text-foreground tracking-tight">
              {String(seg.value).padStart(2, "0")}
            </span>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">{seg.label}</p>
          </div>
          {i < segments.length - 1 && (
            <span className="text-3xl md:text-5xl text-muted-foreground/30 font-light">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
