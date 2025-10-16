"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type MetrikaFn = (id: number, method: string, url?: string) => void;

export default function Metrika() {
  const pathname = usePathname();

  useEffect(() => {
    if ("ym" in window) {
      (window.ym as MetrikaFn)(
        104665911,
        "hit",
        `https://твоякосметика.online${pathname}`
      );
    }
  }, [pathname]);

  return null;
}
