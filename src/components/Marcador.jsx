// src/components/Marcador.js
import React from "react";

const Marcador = ({ mensaje }) => {
  return (
    <div id="info">
      <pre>{mensaje}</pre>
    </div>
  );
};

export default Marcador;
