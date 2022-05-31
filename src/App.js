import React, { useState } from "react";
import {
  Box,
  Paper,
  Slider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [redBg, setRedBg] = useState(0);
  const [greenBg, setGreenBg] = useState(0);
  const [blueBg, setBlueBg] = useState(0);
  const [opacityBg, setOpacityBg] = useState(10);

  const draw = (ctx, frameCount) => {
    ctx.fillStyle = `rgba(${redBg}, ${greenBg}, ${blueBg}, ${
      opacityBg * 0.001
    })`;
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
        <Box
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
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="h5" className="app__sliderTitle">
                Параметры волны
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="h5" className="app__sliderTitle">
                Амплитуда
              </Typography>
              <Slider
                value={amplitude}
                onChange={(evt) => setAmplitude(evt.target.value)}
                min={50}
                max={350}
                valueLabelDisplay="auto"
                size="small"
              />
              <Typography component="h5" className="app__sliderTitle">
                Вертикальная скорость
              </Typography>
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
                valueLabelDisplay="auto"
                size="small"
              />
              <Typography component="h5" className="app__sliderTitle">
                Горизонтальная скорость
              </Typography>
              <Slider
                value={horizontalSpeed}
                onChange={(evt) => setHorizontalSpeed(evt.target.value)}
                min={1}
                max={15}
                valueLabelDisplay="auto"
                size="small"
              />
              <Typography component="h5" className="app__sliderTitle">
                Частота
              </Typography>
              <Slider
                value={frequency}
                onChange={(evt) => setFrequency(evt.target.value)}
                min={1}
                max={15}
                valueLabelDisplay="auto"
                size="small"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="h5" className="app__sliderTitle">
                Цвета волны
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="h5" className="app__sliderTitle">
                Цвет волны
              </Typography>
              <Slider
                value={vaweColor}
                onChange={(evt) => setVaweColor(evt.target.value)}
                min={0}
                max={255}
                valueLabelDisplay="auto"
                size="small"
              />
              <Typography component="h5" className="app__sliderTitle">
                Насыщенность волны
              </Typography>
              <Slider
                value={vaweSaturation}
                onChange={(evt) => setVaweSaturation(evt.target.value)}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                size="small"
              />
              <Typography component="h5" className="app__sliderTitle">
                Яркость волны
              </Typography>
              <Slider
                value={vaweLightness}
                onChange={(evt) => setVaweLightness(evt.target.value)}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                size="small"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="h5" className="app__sliderTitle">
                Фон
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="h5" className="app__sliderTitle">
                Красный
              </Typography>
              <Slider
                value={redBg}
                onChange={(evt) => setRedBg(evt.target.value)}
                min={0}
                max={255}
                valueLabelDisplay="auto"
                size="small"
              />
              <Typography component="h5" className="app__sliderTitle">
                Зелёный
              </Typography>
              <Slider
                value={greenBg}
                onChange={(evt) => setGreenBg(evt.target.value)}
                min={0}
                max={255}
                valueLabelDisplay="auto"
                size="small"
              />
              <Typography component="h5" className="app__sliderTitle">
                Синий
              </Typography>
              <Slider
                value={blueBg}
                onChange={(evt) => setBlueBg(evt.target.value)}
                min={0}
                max={255}
                valueLabelDisplay="auto"
                size="small"
              />
              <Typography component="h5" className="app__sliderTitle">
                Прозрачность
              </Typography>
              <Slider
                value={opacityBg}
                onChange={(evt) => setOpacityBg(evt.target.value)}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                size="small"
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default App;
