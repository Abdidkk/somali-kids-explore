
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DownloadButton = () => {
  const handleDownload = () => {
    // Dette er en simpel demonstration - i en rigtig implementering
    // ville dette være koblet til en backend service
    const dummyData = {
      projectName: "somali-kids-explore",
      date: new Date().toISOString(),
      message: "Dette er en demo af download funktionaliteten"
    };

    const blob = new Blob([JSON.stringify(dummyData, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projekt-backup.json";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Button 
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Download Projekt
    </Button>
  );
};

export default DownloadButton;
