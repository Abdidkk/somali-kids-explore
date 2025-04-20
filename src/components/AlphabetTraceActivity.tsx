
import React from "react";
import AlphabetPrototype from "./AlphabetPrototype";

interface Props {
  onBack: () => void;
}

/**
 * Spor bogstavet-aktivitetskomponent (samme som tidligere prototype)
 */
export default function AlphabetTraceActivity({ onBack }: Props) {
  // evt. tilføj flere props/muligheder senere
  return (
    <div>
      <AlphabetPrototype />
      {/* Evt. flere kontroller i fremtiden */}
    </div>
  );
}
