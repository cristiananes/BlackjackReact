// src/components/CanvasJuego.js
import React, { useEffect } from "react";

const CanvasJuego = ({ refCanvas, cartasJugador, cartasCrupier }) => {
  useEffect(() => {
    console.log("Dibujando cartas del jugador:", cartasJugador);
    const canvas = refCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // Configuración del canvas
    canvas.width = 1220 * 2;
    canvas.height = 400 * 2;
    canvas.style.width = "1220px";
    canvas.style.height = "400px";

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Función para dibujar una carta
    const dibujarCarta = (carta, posX, posY) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, posX, posY, 239, 335);
      };
      // Ajusta la ruta según donde coloques las imágenes en public
      img.src = `/imagenes/cartas/${carta.valor}${carta.palo}.svg`;
    };

    // Dibujar cartas del jugador
    let posX = 50;
    let posY = 50;
    cartasJugador.forEach((carta) => {
      dibujarCarta(carta, posX, posY);
      posX += 300;
    });

    // Dibujar cartas del crupier
    posX = 50;
    posY = 400;
    cartasCrupier.forEach((carta) => {
      dibujarCarta(carta, posX, posY);
      posX += 300;
    });
  }, [refCanvas, cartasJugador, cartasCrupier]);

  return <canvas ref={refCanvas} />;
};

export default CanvasJuego;
