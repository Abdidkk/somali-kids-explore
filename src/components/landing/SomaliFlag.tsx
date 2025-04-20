import React from "react";
const SomaliFlag = ({
  className = ""
}: {
  className?: string;
}) => <div className={`relative w-12 h-8 rounded-sm overflow-hidden shadow ${className}`} style={{
  background: "#4CA6FE"
}} title="Somalisk flag">
    {/* Simpel hvid stjerne i midten */}
    
  </div>;
export default SomaliFlag;