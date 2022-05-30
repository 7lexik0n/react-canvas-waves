import React, { useRef, useEffect } from "react";
import useSize from "../hooks/useSize";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const sizes = useSize();
  const { draw, ...rest } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = sizes.width;
    canvas.height = sizes.height;
    const context = canvas.getContext("2d");

    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [sizes, draw]);

  return <canvas ref={canvasRef} {...rest}></canvas>;
};

export default Canvas;
