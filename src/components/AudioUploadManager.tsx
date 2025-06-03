
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface AudioFile {
  name: string;
  expectedPath: string;
  uploaded: boolean;
}

const AudioUploadManager: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<Record<string, boolean>>({});
  const [isChecking, setIsChecking] = useState(false);

  const audioFiles: AudioFile[] = [
    // Alphabet files - vowels
    ...['A', 'E', 'I', 'O', 'U', 'AA', 'EE', 'II', 'OO', 'UU'].map(letter => ({
      name: `Alfabet: ${letter}`,
      expectedPath: `/audio/alphabet/${letter}.mp3`,
      uploaded: false
    })),
    // Alphabet files - consonants  
    ...['B', 'T', 'J', 'X', 'KH', 'D', 'R', 'S', 'SH', 'DH', 'C', 'G', 'F', 'Q', 'K', 'L', 'M', 'N', 'W', 'H', 'Y'].map(letter => ({
      name: `Alfabet: ${letter}`,
      expectedPath: `/audio/alphabet/${letter}.mp3`,
      uploaded: false
    })),
    
    // Family files
    { name: 'Familie: Hooyo (Mor)', expectedPath: '/audio/family/hooyo.mp3', uploaded: false },
    { name: 'Familie: Aabo (Far)', expectedPath: '/audio/family/aabo.mp3', uploaded: false },
    { name: 'Familie: Walaal dumar (Søster)', expectedPath: '/audio/family/walaal_dumar.mp3', uploaded: false },
    { name: 'Familie: Walaal lab (Bror)', expectedPath: '/audio/family/walaal_lab.mp3', uploaded: false },
    { name: 'Familie: Ilmo (Baby)', expectedPath: '/audio/family/ilmo.mp3', uploaded: false },
    { name: 'Familie: Carruur (Barn)', expectedPath: '/audio/family/carruur.mp3', uploaded: false },
    { name: 'Familie: Ayeeyo (Bedstemor)', expectedPath: '/audio/family/ayeeyo.mp3', uploaded: false },
    { name: 'Familie: Awoowe (Bedstefar)', expectedPath: '/audio/family/awoowe.mp3', uploaded: false },
    
    // Food files
    { name: 'Mad: Bariis (Ris)', expectedPath: '/audio/food/bariis.mp3', uploaded: false },
    { name: 'Mad: Cambe (Mango)', expectedPath: '/audio/food/cambe.mp3', uploaded: false },
    { name: 'Mad: Tufaax (Æble)', expectedPath: '/audio/food/tufaax.mp3', uploaded: false },
    { name: 'Mad: Muus (Banan)', expectedPath: '/audio/food/muus.mp3', uploaded: false },
    { name: 'Mad: Caano (Mælk)', expectedPath: '/audio/food/caano.mp3', uploaded: false },
  ];

  const checkAudioFile = async (path: string): Promise<boolean> => {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleCheckAll = async () => {
    setIsChecking(true);
    const newStatus: Record<string, boolean> = {};
    
    for (const file of audioFiles) {
      const exists = await checkAudioFile(file.expectedPath);
      newStatus[file.expectedPath] = exists;
    }
    
    setUploadStatus(newStatus);
    setIsChecking(false);
  };

  const getStatusColor = (path: string) => {
    if (uploadStatus[path] === undefined) return 'text-gray-400';
    return uploadStatus[path] ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (path: string) => {
    if (uploadStatus[path] === undefined) return null;
    return uploadStatus[path] ? 
      <CheckCircle className="w-5 h-5 text-green-500" /> : 
      <AlertCircle className="w-5 h-5 text-red-500" />;
  };

  const foundCount = Object.values(uploadStatus).filter(Boolean).length;
  const totalCount = Object.keys(uploadStatus).length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Lydfil Manager
        </CardTitle>
        <p className="text-sm text-gray-600">
          Tjek status på dine uploadede lydfiler. Klik "Tjek alle lydfiler" for at se hvilke filer der er fundet.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <Button onClick={handleCheckAll} disabled={isChecking} className="flex items-center gap-2">
            {isChecking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {isChecking ? 'Tjekker...' : 'Tjek alle lydfiler'}
          </Button>
          
          {totalCount > 0 && (
            <div className="text-sm text-gray-600">
              Status: {foundCount} af {totalCount} filer fundet
            </div>
          )}
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {audioFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">{file.name}</span>
                <p className="text-xs text-gray-500">{file.expectedPath}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(file.expectedPath)}
                <span className={`text-sm ${getStatusColor(file.expectedPath)}`}>
                  {uploadStatus[file.expectedPath] === undefined ? 'Ikke tjekket' : 
                   uploadStatus[file.expectedPath] ? 'Fundet' : 'Mangler'}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Tips:</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Sørg for at filerne er navngivet præcist som vist (inklusive store/små bogstaver)</li>
            <li>Alle filer skal være i MP3 format</li>
            <li>Hvis en fil vises som "Mangler", tjek at stien og navnet er korrekt</li>
            <li>Efter upload, klik "Tjek alle lydfiler" for at opdatere status</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioUploadManager;
