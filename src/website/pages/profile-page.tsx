import { SiteShell } from "@/website/components/site-shell";
import { ProfileSection } from "@/website/sections/auth/profile-section";

export function ProfilePage() {
  return (
    <SiteShell>
      <ProfileSection />
    </SiteShell>
  );
}
