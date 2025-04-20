
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserRound, Settings, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Brug evt. prop eller context for dynamiske værdier
const PROFILE = {
  name: "Sami",
  image:
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=96&h=96&facepad=3",
};

export default function ProfileMenu() {
  // Fjern mobil-variant og brug altid dropdown-menuen
  return (
    <div className="absolute top-8 right-8 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center bg-purple-100 hover:bg-purple-200 rounded-full p-2 shadow-md transition focus:outline-none">
            <UserRound className="w-6 h-6 text-purple-600" />
            <span className="sr-only">Åbn profilmenu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white shadow-lg border mt-2 animate-fade-in">
          <DropdownMenuItem className="flex items-center gap-2">
            <UserRound className="w-4 h-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Indstillinger</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            {/* Feedback icon: bruger pil-ud af Lucide-pakken som er tilladt */}
            <LogOut className="w-4 h-4 opacity-0" /> {/* usynlig for spacing */}
            <span>Feedback</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-600">
            <LogOut className="w-4 h-4" />
            <span>Log ud</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

