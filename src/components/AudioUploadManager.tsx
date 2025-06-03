
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface AudioFile {
  name: string;
  expectedPath: string;
  uploaded: boolean;
}

const AudioUploadManager: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<Record<string, boolean>>({});

  const audioFiles: AudioFile[] = [
    // Alphabet files
    ...['A', 'E', 'I', 'O', 'U', 'AA', 'EE', 'II', 'OO', 'UU'].map(letter => ({
      name: `Alphabet: ${letter}`,
      expectedPath: `/audio/alphabet/${letter}.mp3`,
      uploaded: false
    })),
    ...['Bb', 'Tt', 'Jj', 'Xx', 'KHkh', 'Dd', 'Rr', 'Ss', 'SHsh', 'DHdh', 'Cc', 'Gg', 'Ff', 'Qq', 'Kk', 'Ll', 'Mm', 'Nn', 'Ww', 'Hh', 'Yy'].map(letter => ({
      name: `Alphabet: ${letter}`,
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
    
    // Food files (sample)
    { name: 'Mad: Bariis (Ris)', expectedPath: '/audio/food/bariis.mp3', uploaded: false },
    { name: 'Mad: Cambe (Mango)', expectedPath: '/audio/food/cambe.mp3', uploaded: false },
    { name: 'Mad: Tufaax (Æble)', expectedPath: '/audio/food/tufaax.mp3', uploaded: false },
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
    const newStatus: Record<string, boolean> = {};
    
    for (const file of audioFiles) {
      const exists = await checkAudioFile(file.expectedPath);
      newStatus[file.expectedPath] = exists;
    }
    
    setUploadStatus(newStatus);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Audio File Manager
        </CardTitle>
        <p className="text-sm text-gray-600">
          Tjek status på jeres uploadede lydfiler. Placer MP3-filer i den korrekte mappestruktur under public/audio/
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={handleCheckAll} className="mb-4">
            Tjek alle lydfiler
          </Button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {audioFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">{file.name}</span>
                <p className="text-xs text-gray-500">{file.expectedPath}</p>
              </div>
              <div className="flex items-center gap-2">
                {uploadStatus[file.expectedPath] === true && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {uploadStatus[file.expectedPath] === false && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Sådan uploader du lydfiler:</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Optag jeres egen stemme og gem som MP3-filer</li>
            <li>Navngiv filerne nøjagtigt som vist i "expectedPath"</li>
            <li>Placer filerne i public/audio/ mappen i jeres projekt</li>
            <li>Klik "Tjek alle lydfiler" for at verificere upload</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioUploadManager;
