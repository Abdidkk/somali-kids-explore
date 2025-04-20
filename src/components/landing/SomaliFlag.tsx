
import React from "react";

// Somali flag SVG - enkel, børnevenlig og pastel
const SomaliFlag = ({
  className = "",
  size = 36
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size * 2 / 3}
    viewBox="0 0 60 40"
    fill="none"
    className={className}
    aria-label="Somalisk flag"
    style={{ display: "inline-block", verticalAlign: "middle" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="60" height="40" rx="7" fill="#4CA6FE" />
    <g>
      <polygon
        points="30,13 32.12,21.21 40.72,21.21 33.79,25.79 36.02,34 30,29.41 23.98,34 26.2,25.79 19.28,21.21 27.88,21.21"
        fill="#fff"
        stroke="#E3F1FD"
        strokeWidth="1"
      />
    </g>
  </svg>
);

export default SomaliFlag;
