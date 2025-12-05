
/**
 * Social Authentication Buttons
 * Handles Google and Facebook authentication
 */

import { Mail } from "lucide-react";
import SocialLoginButton from "@/components/SocialLoginButton";
import { useAuthOperations } from "@/hooks/auth/useAuthOperations";

interface SocialAuthButtonsProps {
  mode: 'login' | 'signup';
}

export function SocialAuthButtons({ mode }: SocialAuthButtonsProps) {
  const { handleSocialAuth } = useAuthOperations();

  // Always redirect to choose-plan for social auth
  // RouteGuard will handle existing paid users
  const redirectPath = '/choose-plan';

  return (
    <div className="flex flex-col gap-3">
      <SocialLoginButton
        icon={Mail}
        label="Fortsæt med Gmail"
        colorClass="border-[#ea384c] text-[#ea384c] hover:border-[#d32e22]/90"
        onClick={() => handleSocialAuth('google', redirectPath)}
      />
<SocialLoginButton
  icon={Mail}
  label="Fortsæt med Microsoft"
  colorClass="border-[#00a4ef] text-[#00a4ef] hover:border-[#0078d4]/90"
  onClick={() => handleSocialAuth('azure', redirectPath)}
/>

    </div>
  );
}
