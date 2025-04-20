
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon, Settings, LogOut, Smile, Moon, Sun, Palette, Music, Gamepad } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PROFILE = {
  name: "Barn",
  email: "",
  birthdate: "",
  image: "",
};

function ProfileDetails() {
  return (
    <div className="flex flex-col items-center py-6 px-3 bg-purple-50 rounded-t-[10px] mb-2">
      <Avatar className="w-16 h-16 ring-2 ring-vivid-purple ring-offset-2 ring-offset-white mb-2 bg-pink-100">
        <Smile className="w-12 h-12 text-purple-400" />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <div className="font-semibold text-lg text-purple-700">{PROFILE.name}</div>
      <div className="text-xs text-gray-400">Velkommen til din profil!</div>
    </div>
  );
}

function SettingsMenu() {
  return (
    <div className="w-full">
      <button className="flex items-center gap-3 py-2 px-6 w-full text-base hover:bg-purple-100 transition text-gray-800">
        <Palette className="w-5 h-5 text-purple-400" />
        Skift baggrundsfarve/tema
      </button>
      <button className="flex items-center gap-3 py-2 px-6 w-full text-base hover:bg-purple-100 transition text-gray-800">
        <Gamepad className="w-5 h-5 text-purple-400" />
        Vælg figur/maskot
      </button>
      <button className="flex items-center gap-3 py-2 px-6 w-full text-base hover:bg-purple-100 transition text-gray-800">
        <span className="text-purple-400">
          <Sun className="inline w-5 h-5 mr-1" />
          /
          <Moon className="inline w-5 h-5 ml-1" />
        </span>
        Skift mellem lys/mørk
      </button>
      <button className="flex items-center gap-3 py-2 px-6 w-full text-base hover:bg-purple-100 transition text-gray-800">
        <Smile className="w-5 h-5 text-purple-400" />
        Skift skriftstørrelse
      </button>
      <button className="flex items-center gap-3 py-2 px-6 w-full text-base hover:bg-purple-100 transition text-gray-800">
        <Music className="w-5 h-5 text-purple-400" />
        Slå lyde til/fra
      </button>
    </div>
  );
}

export default function ProfileMenu() {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobil "sheet" menu hvor oplysninger vises øverst
    return (
      <div className="fixed top-5 right-5 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center bg-purple-100 hover:bg-purple-200 rounded-full p-2 shadow-md transition focus:outline-none">
              <UserIcon className="w-6 h-6 text-purple-600" />
              <span className="sr-only">Åbn profilmenu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 max-w-full py-0 px-0">
            <ProfileDetails />
            <div className="flex flex-col py-4">
              <div className="px-6 pb-2 font-semibold text-gray-500">Profil</div>
              <div className="flex items-center gap-3 px-6 py-2">
                <Avatar className="w-10 h-10 ring-1 ring-purple-200 bg-pink-100">
                  <Smile className="w-7 h-7 text-purple-400" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <span className="font-medium">{PROFILE.name}</span>
              </div>
              <div className="flex flex-col gap-1 px-6 pb-2 text-xs text-gray-500">
                <span>- Dine resultater og niveau bliver gemt</span>
                <span>- Ændr maskot og udseende i menuen</span>
              </div>
              <div className="px-6 pt-2 font-semibold text-gray-500">Indstillinger</div>
              <SettingsMenu />
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

  // Desktop dropdown-menu
  return (
    <div className="absolute top-8 right-8 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center bg-purple-100 hover:bg-purple-200 rounded-full p-2 shadow-md transition focus:outline-none">
            <UserIcon className="w-6 h-6 text-purple-600" />
            <span className="sr-only">Åbn profilmenu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-white shadow-lg border mt-2 animate-fade-in">
          <DropdownMenuLabel>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 ring-1 ring-purple-200 bg-pink-100">
                <Smile className="w-7 h-7 text-purple-400" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{PROFILE.name}</div>
                <div className="text-xs text-gray-400">Velkommen til din profil!</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              - Dine resultater og niveau bliver gemt <br />
              - Tryk på indstillinger for mere sjov!
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span>Profiloplysninger</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Indstillinger</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>Skift baggrund/tema</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Gamepad className="w-4 h-4 text-purple-400" />
              <span>Vælg figur/maskot</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="text-purple-400">
                <Sun className="inline w-4 h-4 mr-1" />/<Moon className="inline w-4 h-4 ml-1" />
              </span>
              <span>Skift mellem lys/mørk</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-purple-400" />
              <span>Skift skriftstørrelse</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-400" />
              <span>Slå lyde til/fra</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
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
