import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BriefcaseBusiness,
  Compass,
  Gauge,
  GraduationCap,
  Handshake,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  UserRoundCog,
} from "lucide-react";

export const successFactorIconMap: Record<string, LucideIcon> = {
  Strategie: Target,
  Cultuur: Scale,
  Commercie: BriefcaseBusiness,
  Uitvoering: Activity,
  Talent: GraduationCap,
};

export const audienceIconMap: Record<string, LucideIcon> = {
  "Managing partners": Compass,
  "Kantoordirecteuren / COOs": Gauge,
  "Vakgroep- en clientteamleiders": Users,
  "(Pre-)partners": UserRoundCog,
};

export const serviceIconMap: Record<string, LucideIcon> = {
  bestuursadvies: ShieldCheck,
  teambegeleiding: Users,
  coaching: Sparkles,
};

export const defaultAccentIcon = Handshake;
