"use client";

import {
  Target,
  PenLine,
  ShieldCheck,
  BookOpen,
  DollarSign,
  Plane,
  Globe,
  FileText,
  Map,
  Monitor,
  BarChart3,
  Settings,
  Building,
  Palette,
  Scale,
  Compass,
  ClipboardList,
  Search,
  GraduationCap,
  Briefcase,
  Star,
  Trophy,
  Lightbulb,
  Award,
  Clock,
  Calendar,
  Users,
  Zap,
  MapPin,
  Phone,
  Mail,
  Camera,
  Check,
  CheckCircle,
  Heart,
  TrendingUp,
  Handshake,
  Sparkles,
  Gem,
  MessageCircle,
  Save,
  FolderOpen,
  CreditCard,
  Home,
  User,
  Send,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Flag,
  Table,
  Percent,
  Image,
  IdCard,
  Landmark,
  HeartPulse,
  Cog,
  Linkedin,
  HeartHandshake,
  Pencil,
  Shield,
  Lock,
  AlertTriangle,
  Microscope,
  MessageSquare,
  ArrowUp,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Target, PenLine, ShieldCheck, BookOpen, DollarSign, Plane, Globe, FileText,
  Map, Monitor, BarChart3, Settings, Building, Palette, Scale, Compass,
  ClipboardList, Search, GraduationCap, Briefcase, Star, Trophy, Lightbulb,
  Award, Clock, Calendar, Users, Zap, MapPin, Phone, Mail, Camera,
  Check, CheckCircle, Heart, TrendingUp, Handshake, Sparkles, Gem,
  MessageCircle, Save, FolderOpen, CreditCard, Home, User, Send,
  ArrowRight, ChevronDown, ChevronRight, ChevronLeft, HelpCircle, Flag,
  Table, Percent, Image, IdCard, Landmark, HeartPulse, Cog,
  Linkedin, HeartHandshake, Pencil, Shield, Lock, AlertTriangle,
  Microscope, MessageSquare,
  ArrowUp,
};

export function Icon({
  name,
  size = 16,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component size={size} className={className} />;
}

/* ─── Country Flags ─────────────────────────────────── */

const FLAG_CODES: Record<string, string> = {
  au: "au", australia: "au",
  ca: "ca", canada: "ca",
  us: "us", usa: "us",
  gb: "gb", uk: "gb",
  nz: "nz", "new-zealand": "nz",
  jp: "jp", japan: "jp",
  kr: "kr", "south-korea": "kr",
  eu: "eu", europe: "eu",
};

export function FlagIcon({
  code,
  size = 20,
  className = "",
}: {
  code: string;
  size?: number;
  className?: string;
}) {
  const isoCode = FLAG_CODES[code.toLowerCase()] || code.toLowerCase();
  const w = size > 20 ? 80 : 40;
  return (
    <img
      src={`https://flagcdn.com/w${w}/${isoCode}.png`}
      srcSet={`https://flagcdn.com/w${w * 2}/${isoCode}.png 2x`}
      alt={`${code} flag`}
      width={Math.round(size * 1.33)}
      height={size}
      className={`inline-block object-cover rounded-sm ${className}`}
      loading="lazy"
      draggable={false}
    />
  );
}
