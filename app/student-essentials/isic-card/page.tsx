import type { Metadata } from "next";
import IsicCardClient from "./IsicCardClient";

export const metadata: Metadata = {
  title: "ISIC Card Support | Nexsus Education",
  description:
    "Apply for the International Student Identity Card (ISIC), unlock global discounts, and get help with eligibility and documentation.",
};

export default function IsicCardPage() {
  return <IsicCardClient />;
}
