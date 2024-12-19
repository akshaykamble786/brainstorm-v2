import { ExplainIcon } from "@/app/icons/ExplainIcon";
import { LengthenIcon } from "@/app/icons/LengthenIcon";
import { ShortenIcon } from "@/app/icons/ShortenIcon";
import { SummariseIcon } from "@/app/icons/SummariseIcon";
import { TranslateIcon } from "@/app/icons/TranslateIcon";
import {
    CheckCheck,
    Mountain,
    Newspaper,
    PenTool,
    RefreshCcwDot,
    Speaker,
} from "lucide-react";

export const languages = [
    "Arabic",
    "Italian",
    "Chinese",
    "Dutch",
    "English",
    "French",
    "German",
    "Hindi",
    "Japanese",
    "Korean",
    "Russian",
    "Portuguese",
    "Spanish",
];
  
export const proses = [
    "Professional",
    "Straightforward",
    "Friendly",
    "Poetic",
    "Passive aggressive",
    "Pirate",
];

export const options = [
    {
      value: "improve",
      label: "Improve writing",
      icon: RefreshCcwDot,
    },
    {
      value: "fix",
      label: "Fix grammar",
      icon: CheckCheck,
    },
    {
      value: "shorter",
      label: "Make shorter",
      icon: ShortenIcon,
    },
    {
      value: "longer",
      label: "Make longer",
      icon: LengthenIcon,
    },
    {
      value: "summarize",
      label: "Summarize",
      icon: SummariseIcon,
    },
    {
      value: "translate",
      label: "Translate",
      icon: TranslateIcon,
    },
    {
      value: "paraphrase",
      label: "Paraphrase",
      icon: Speaker,
    },
    {
      value: "elaborate",
      label: "Elaborate",
      icon: Mountain,
    },
    {
      value: "bloggify",
      label: "Bloggify",
      icon: Newspaper,
    },
    {
      value: "prose",
      label: "Change prose",
      icon: PenTool,
    },
    {
      value: "explain",
      label: "Explain",
      icon: ExplainIcon,
    },
  ];