
/**
 * Social Authentication Buttons
 * Handles Google and Facebook authentication
 */

import { Mail, Facebook } from "lucide-react";
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
        icon={Facebook}
        label="Fortsæt med Facebook"
        colorClass="border-[#1877f3] text-[#1877f3] hover:border-[#1557b8]/90"
        onClick={() => handleSocialAuth('facebook', redirectPath)}
      />
    </div>
  );
}
