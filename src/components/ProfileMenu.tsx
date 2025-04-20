
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, Settings, Mail, LogOut } from "lucide-react";

// Du kan her putte navigation/logik ind i knapperne hvis der senere skal tilføjes funktionalitet.
export default function ProfileMenu() {
  return (
    <div className="absolute top-8 right-8 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center bg-purple-100 hover:bg-purple-200 rounded-full p-2 shadow-md transition focus:outline-none">
            <User className="w-6 h-6 text-purple-600" />
            <span className="sr-only">Åbn profilmenu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white shadow-lg border mt-2 animate-fade-in">
          <DropdownMenuItem className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Indstillinger</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
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
