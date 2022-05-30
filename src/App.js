import React, { useState } from "react";
import { Paper, Slider, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Canvas from "./components/Canvas";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [amplitude, setAmplitude] = useState(150);
  const [amplitudeVelociy, setAmplitudeVelociy] = useState(5);
  const [horizontalSpeed, setHorizontalSpeed] = useState(5);
  const [frequency, setFrequency] = useState(1);
  const [vaweColor, setVaweColor] = useState(0);
  const [vaweSaturation, setVaweSaturation] = useState(50);
  const [vaweLightness, setVaweLightness] = useState(50);

  const draw = (ctx, frameCount) => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2);

    for (let i = 0; i < ctx.canvas.width; i++) {
      ctx.lineTo(
        i,
        ctx.canvas.height / 2 +
          Math.sin(frameCount * amplitudeVelociy * 0.001) *
            amplitude *
            Math.sin(
              i * 0.005 * frequency + frameCount * 0.002 * horizontalSpeed
            )
      );
    }

    ctx.strokeStyle = `hsl(${vaweColor}, ${vaweSaturation}%, ${vaweLightness}%)`;
    ctx.stroke();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app__container">
        <Canvas draw={draw} id="waves" />
        <Paper
          className="app__sliders"
          sx={{
            position: "absolute",
            right: "15px",
            top: "15px",
            width: "300px",
            padding: "5px 10px",
            textAlign: "center",
          }}
        >
          <Typography component="h5">Амплитуда</Typography>
          <Slider
            value={amplitude}
            onChange={(evt) => setAmplitude(evt.target.value)}
            min={50}
            max={350}
          />
          <Typography component="h5">Вертикальная скорость</Typography>
          <Slider
            value={amplitudeVelociy}
            scale={(value) => {
              return 5 * value;
            }}
            onChange={(evt, newValue) => {
              setAmplitudeVelociy(newValue);
            }}
            step={1}
            min={1}
            max={50}
          />
          <Typography component="h5">Горизонтальная скорость</Typography>
          <Slider
            value={horizontalSpeed}
            onChange={(evt) => setHorizontalSpeed(evt.target.value)}
            min={1}
            max={15}
          />
          <Typography component="h5">Частота</Typography>
          <Slider
            value={frequency}
            onChange={(evt) => setFrequency(evt.target.value)}
            min={1}
            max={15}
          />
          <Typography component="h5">Цвет волны</Typography>
          <Slider
            value={vaweColor}
            onChange={(evt) => setVaweColor(evt.target.value)}
            min={0}
            max={255}
          />
          <Typography component="h5">Насыщенность волны</Typography>
          <Slider
            value={vaweSaturation}
            onChange={(evt) => setVaweSaturation(evt.target.value)}
            min={0}
            max={100}
          />
          <Typography component="h5">Яркость волны</Typography>
          <Slider
            value={vaweLightness}
            onChange={(evt) => setVaweLightness(evt.target.value)}
            min={0}
            max={100}
          />
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default App;
