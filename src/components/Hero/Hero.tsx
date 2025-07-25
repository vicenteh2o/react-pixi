import { Container, Sprite } from "@pixi/react";
import type { Texture } from "pixi.js";
import { useRef, useEffect } from "react";
import { DEFAULT_POS_X, DEFAULT_POS_Y } from "../../constants/game-world";

interface IHeroProps {
  texture: Texture;
  onMove: (gridX: number, gridY: number) => void;
}

export const Hero = ({ texture, onMove }: IHeroProps) => {
  const position = useRef({ x: DEFAULT_POS_X, y: DEFAULT_POS_Y });

  useEffect(() => {
    onMove(position.current.x, position.current.y);
  }, [onMove]);

  return (
    <Container>
      <Sprite
        texture={texture}
        x={position.current.x}
        y={position.current.y}
        scale={0.5}
        anchor={[1, 0.5]}
      />
    </Container>
  );
};
