import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "centered";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export function PageContainer({ 
  children, 
  className, 
  variant = "default",
  maxWidth = "xl"
}: PageContainerProps) {
  const variantClasses = {
    default: "bg-background",
    gradient: "bg-gradient-to-b from-blue-50 to-white",
    centered: "bg-background flex items-center justify-center min-h-screen"
  };

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-4xl", 
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none"
  };

  return (
    <div className={cn(
      "min-h-screen py-4 px-4 safe-area-padding",
      variantClasses[variant],
      className
    )}>
      <div className={cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth]
      )}>
        {children}
      </div>
    </div>
  );
}