
import React from "react";

const SomaliFlag = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative w-12 h-8 rounded-sm overflow-hidden shadow ${className}`}
    style={{ background: "#4CA6FE" }}
    title="Somalisk flag"
  >
    {/* Simpel hvid stjerne i midten */}
    <svg
      viewBox="0 0 32 32"
      width="22"
      height="22"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <polygon
        points="16,4 18.472,13.169 28,13.169 20,18.832 22.472,28 16,22.337 9.528,28 12,18.832 4,13.169 13.528,13.169"
        fill="#fff"
      />
    </svg>
  </div>
);

export default SomaliFlag;
