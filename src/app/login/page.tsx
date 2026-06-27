import type { Metadata } from "next";
import { LoginPage } from "@/website/pages/login-page";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default function Page() {
  return <LoginPage />;
}
