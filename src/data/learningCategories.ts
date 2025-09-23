
import { Mic, Palette, Calculator, Carrot, PawPrint, Earth, Calendar, Users, House, Activity, MessageSquare, Music, BookOpen, HelpCircle, Hand } from "lucide-react";

export interface LearningCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  description: string;
}

export const learningCategories: LearningCategory[] = [
  {
    name: "Alfabet",
    icon: Mic,
    bgColor: "#E9E3FC",
    description: "Somaliske bogstaver og udtale.",
  },
  {
    name: "Farver",
    icon: Palette,
    bgColor: "#FFEFF1",
    description: "Navne og genkendelse.",
  },
  {
    name: "Tal",
    icon: Calculator,
    bgColor: "#DBF3FA",
    description: "Optælling af tal på somaliske.",
  },
  {
    name: "Mad",
    icon: Carrot,
    bgColor: "#FBF1DE",
    description: "Ordforråd for frugter og grøntsager.",
  },
  {
    name: "Dyr",
    icon: PawPrint,
    bgColor: "#FFFBE0",
    description: "Lær dyrearter på somaliske.",
  },
  {
    name: "Kropsdel",
    icon: Hand,
    bgColor: "#E2F7FF",
    description: "Lær navnene på kroppens dele på somalisk.",
  },
  {
    name: "Geografi",
    icon: Earth,
    bgColor: "#E5FAF1",
    description: "Lær om lande, Kontinenter og nartur geografi.",
  },
  {
    name: "Kalender",
    icon: Calendar,
    bgColor: "#E7F0FB",
    description: "Lær ordnavne dage, måneder og årstider på somaliske.",
  },
  {
    name: "Familie og venner",
    icon: Users,
    bgColor: "#FDE4F2",
    description: "Opbygge ordforråd omkring relationer og sociale dynamikker.",
  },
  {
    name: "Ord",
    icon: House,
    bgColor: "#E5E8ED",
    description: "Ordforråd med fokus på genstande i et hus, såsom stol, fjernsyn og sofa.",
  },
  {
    name: "Daglige aktiviteter",
    icon: Activity,
    bgColor: "#FFF2EB",
    description: "Sætninger og udtryk for almindelige opgaver.",
  },
  {
    name: "Sætninger",
    icon: MessageSquare,
    bgColor: "#E6F5F8",
    description: "Strukturerede somaliske sætninger til kommunikationsøvelse.",
  },
  {
    name: "Kulturelt indhold",
    icon: Music,
    bgColor: "#F9EAF6",
    description: "Udforske somalisk kulturarv gennem fortællinger, sange og traditioner.",
  },
  {
    name: "Læse bøger",
    icon: BookOpen,
    bgColor: "#FDF5E3",
    description: "Engagerende historier og praktisk anvendelse.",
  },
  {
    name: "Quiz",
    icon: HelpCircle,
    bgColor: "#F7EFFF",
    description: "Test din viden om det, du har lært.",
  },
];
