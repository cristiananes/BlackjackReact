// src/components/ControlesJuego.js
import React from "react";

const ControlesJuego = ({ onPedirCarta, onPlantarme, onJugarDeNuevo }) => {
  return (
    <div className="botones">
      <button onClick={onPedirCarta} className="button">
        Pedir Carta
      </button>
      <button onClick={onPlantarme} className="button">
        Plantarme
      </button>
      <button onClick={onJugarDeNuevo} id="reset" className="button">
        ¡Jugar otra vez!
      </button>
    </div>
  );
};

export default ControlesJuego;
