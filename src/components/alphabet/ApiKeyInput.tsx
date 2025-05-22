
import React from "react";

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export default function ApiKeyInput({ apiKey, onApiKeyChange }: ApiKeyInputProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xs">
      <input
        type="password"
        placeholder="ElevenLabs API nøgle"
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        className="border rounded px-3 py-2 text-sm w-full"
      />
    </div>
  );
}
