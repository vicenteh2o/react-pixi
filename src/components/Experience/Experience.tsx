import { Stage } from "@pixi/react";
import { useEffect, useState, useCallback } from "react";
import { calculateCanvasSize } from "../../helpers/common";
import { MainContainer } from "./MainContainer/MainContainer";

export const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize);

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  return (
    <Stage width={canvasSize.width} height={canvasSize.height}>
      <MainContainer canvasSize={canvasSize} />
    </Stage>
  );
};
