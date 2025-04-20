
import { Button } from "@/components/ui/button";
import { facebook, gmail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface SocialLoginButtonProps {
  icon: LucideIcon;
  label: string;
  colorClass?: string;
  onClick?: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  icon: Icon,
  label,
  colorClass = "",
  onClick,
}) => (
  <Button
    type="button"
    onClick={onClick}
    variant="outline"
    size="lg"
    className={`w-full transition hover:scale-105 border-gray-200 ${colorClass} flex items-center justify-center`}
    disabled
    aria-label={label}
  >
    <Icon className="mr-2" size={22} />
    {label}
  </Button>
);

export default SocialLoginButton;
