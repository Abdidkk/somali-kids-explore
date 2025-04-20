
import React from "react";

const SomaliFlag = ({ className = "" }: { className?: string }) => (
  <svg
    width="36"
    height="24"
    viewBox="0 0 36 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Somalisk flag"
  >
    <rect width="36" height="24" rx="3" fill="#4CA6FE" />
    <path
      d="M18 6.5l1.175 3.59h3.775l-3.055 2.22 1.175 3.64L18 13.7l-3.07 2.25 1.19-3.64-3.061-2.22h3.773L18 6.5z"
      fill="white"
    />
  </svg>
);

export default SomaliFlag;
