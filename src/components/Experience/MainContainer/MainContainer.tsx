import { Container, Sprite } from "@pixi/react";
import { useMemo, type PropsWithChildren } from "react";
import backgroundAsset from "../../../assets/bg.jpg";
import { Texture } from "pixi.js";

interface IMainContainerProps {
  canvasSize: { width: number; height: number };
}

export const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const backgroundTexture = useMemo(() => Texture.from(backgroundAsset), []);
  return (
    <Container>
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      {children}
    </Container>
  );
};
