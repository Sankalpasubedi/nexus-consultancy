import type { Metadata } from "next";
import PaymentUsedClient from "./PaymentUsedClient";

export const metadata: Metadata = {
  title: "Payment Used | Nexsus Education",
  description:
    "See the payment methods used by Nexsus for tuition and service processing, including Flywire, Convera, Stripe, Wise, and bank transfer.",
};

export default function PaymentUsedPage() {
  return <PaymentUsedClient />;
}
