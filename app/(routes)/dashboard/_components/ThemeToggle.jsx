"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function changeTheme() {
    const newTheme = theme === "dark" ? "light" : "dark"; 
    setTheme(newTheme); 
  }

  return (
    <button
      className="p-2 rounded-lg text-muted-foreground outline-none transition-colors hover:bg-border/50 focus:bg-border/50"
      onClick={changeTheme}
      aria-label="Switch Theme"
    >
      {theme === "dark" ? (
        <Sun style={{ width: 18, height: 18 }} />
      ) : (
        <Moon style={{ width: 18, height: 18 }} />
      )}
    </button>
  );
}
