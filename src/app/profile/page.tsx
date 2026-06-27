import type { Metadata } from "next";
import { ProfilePage } from "@/website/pages/profile-page";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your profile.",
};

export default function Page() {
  return <ProfilePage />;
}
