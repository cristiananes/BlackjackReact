// src/App.js
import React, { useState, useRef, useEffect } from "react";
import CanvasJuego from "../components/CanvasJuego.jsx";
import ControlesJuego from "../components/ControlesJuego.jsx";
import Marcador from "../components/Marcador.jsx";
import "./App.css";

function App() {
  // Estados del juego
  const [cartasJugador, setCartasJugador] = useState([]);
  const [cartasCrupier, setCartasCrupier] = useState([]);
  const [indiceCarta, setIndiceCarta] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [mazo, setMazo] = useState([]);

  // Referencia para el canvas
  const refCanvas = useRef(null);

  // Inicialización del mazo y barajado
  useEffect(() => {
    const palos = ["S", "H", "D", "C"];
    let nuevasCartas = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        nuevasCartas.push({ valor: j, palo: palos[i] });
      }
    }
    // Barajamos el mazo usando Fisher-Yates
    for (let i = nuevasCartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nuevasCartas[i], nuevasCartas[j]] = [nuevasCartas[j], nuevasCartas[i]];
    }
    setMazo(nuevasCartas);
  }, []);

  // Función para pedir una carta
  const pedirCarta = () => {
    console.log("Pedir carta", indiceCarta);
    if (indiceCarta < 8 && mazo.length > 0) {
      const carta = mazo[indiceCarta];
      setCartasJugador((prev) => [...prev, carta]);
      setIndiceCarta((ind) => ind + 1);
    }
  };

  // Función para plantarse y que el crupier saque sus cartas
  const plantarme = () => {
    let puntosJugador = cartasJugador.reduce(
      (acum, carta) => acum + carta.valor,
      0
    );
    let puntosCrupier = 0;
    let nuevasCartasCrupier = [...cartasCrupier];

    while (puntosCrupier < 17 && indiceCarta < mazo.length) {
      const carta = mazo[indiceCarta];
      nuevasCartasCrupier.push(carta);
      puntosCrupier += carta.valor;
      setIndiceCarta((ind) => ind + 1);
    }
    setCartasCrupier(nuevasCartasCrupier);

    let mensajeFinal = `Puntuación jugador: ${puntosJugador}\nPuntuación crupier: ${puntosCrupier}\n`;
    if (puntosJugador === 21) {
      mensajeFinal += "¡Blackjack! ¡Has ganado!";
    } else if (puntosJugador > 21) {
      mensajeFinal += "Has perdido... Te has pasado de puntos";
    } else if (puntosCrupier > 21) {
      mensajeFinal += "¡Has ganado! El crupier se ha pasado de puntos";
    } else if (puntosCrupier >= puntosJugador) {
      mensajeFinal += "Ha ganado el crupier...";
    } else {
      mensajeFinal += "¡Has ganado!";
    }
    setMensaje(mensajeFinal);
  };

  // Función para reiniciar el juego
  const jugarDeNuevo = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Juego del Blackjack</h1>
      <CanvasJuego
        refCanvas={refCanvas}
        cartasJugador={cartasJugador}
        cartasCrupier={cartasCrupier}
      />
      <ControlesJuego
        onPedirCarta={pedirCarta}
        onPlantarme={plantarme}
        onJugarDeNuevo={jugarDeNuevo}
      />
      <Marcador mensaje={mensaje} />
    </div>
  );
}

export default App;
