
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserRound, Settings, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Brug evt. prop eller context for dynamiske værdier
const PROFILE = {
  name: "Sami",
  image:
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=96&h=96&facepad=3",
};

export default function ProfileMenu() {
  const isMobile = useIsMobile();
  // Mobilmenu state styres af Sheet-komponenten

  if (isMobile) {
    // Mobil "sheet" menu
    return (
      <div className="fixed top-5 right-5 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center bg-purple-100 hover:bg-purple-200 rounded-full p-2 shadow-md transition focus:outline-none">
              <UserRound className="w-6 h-6 text-purple-600" />
              <span className="sr-only">Åbn profilmenu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 max-w-full py-0 px-0">
            <div className="flex flex-col items-center py-8 bg-purple-50 rounded-t-[10px]">
              <Avatar className="w-16 h-16 ring-2 ring-vivid-purple ring-offset-2 ring-offset-white mb-2">
                <AvatarImage src={PROFILE.image} alt={PROFILE.name} />
                <AvatarFallback>{PROFILE.name[0]}</AvatarFallback>
              </Avatar>
              <div className="font-semibold text-lg text-purple-700 mb-2">
                {PROFILE.name}
              </div>
            </div>
            <div className="flex flex-col py-4">
              <button className="flex items-center gap-3 py-3 px-6 text-base hover:bg-purple-100 transition text-gray-800">
                <UserRound className="w-5 h-5" />
                Profil
              </button>
              <button className="flex items-center gap-3 py-3 px-6 text-base hover:bg-purple-100 transition text-gray-800">
                <Settings className="w-5 h-5" />
                Indstillinger
              </button>
              <button className="flex items-center gap-3 py-3 px-6 text-base hover:bg-purple-100 transition text-gray-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H7m6-4v1a4 4 0 01-4 4H7"></path></svg>
                Feedback
              </button>
              <div className="my-2 border-t border-purple-100" />
              <button className="flex items-center gap-3 py-3 px-6 text-base text-red-500 hover:bg-red-50 transition">
                <LogOut className="w-5 h-5" />
                Log ud
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Desktop dropdown-menu uændret
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

