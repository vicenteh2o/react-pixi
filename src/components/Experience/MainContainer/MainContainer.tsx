import { Container, Sprite } from "@pixi/react";
import { useCallback, useMemo, type PropsWithChildren, useState } from "react";
import backgroundAsset from "../../../assets/bg.jpg";
import { Texture } from "pixi.js";
import { Level } from "../../Levels/Level";
import { Hero } from "../../Hero/Hero";
import heroAsset from "../../../assets/hero.png";
import coinAsset from "../../../assets/coin-gold.png";
import coinRedAsset from "../../../assets/coin-red.png";
import { TILE_SIZE } from "../../../constants/game-world";
import { Camera } from "../../Camera/Camera";
import { Coin } from "../../Coin/Coin";

interface IMainContainerProps {
  canvasSize: { width: number; height: number };
}

export const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 });
  const backgroundTexture = useMemo(() => Texture.from(backgroundAsset), []);
  const heroTexture = useMemo(() => Texture.from(heroAsset), []);
  const coinTexture = useMemo(() => Texture.from(coinAsset), []);
  const coinRedTexture = useMemo(() => Texture.from(coinRedAsset), []);

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    });
  }, []);

  return (
    <Container>
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      {children}
      <Camera canvasSize={canvasSize} heroPosition={heroPosition}>
        <Level />
        <Hero texture={heroTexture} onMove={updateHeroPosition} />
        <Coin texture={coinTexture} x={5} y={10} />
        <Coin texture={coinTexture} x={6} y={11} />
      </Camera>
      {/* interface */}
      <Coin texture={coinRedTexture} x={0} y={1} />
      <Coin texture={coinRedTexture} x={1} y={1} />
      <Coin texture={coinRedTexture} x={2} y={1} />
    </Container>
  );
};
