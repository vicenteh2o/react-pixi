import { Container, Sprite, useTick } from "@pixi/react";
import type { Texture } from "pixi.js";
import { useRef, useEffect, useCallback } from "react";
import {
  ANIMATION_SPEED,
  DEFAULT_POS_X,
  DEFAULT_POS_Y,
  MOVE_SPEED,
} from "../../constants/game-world";
import { useHeroControls } from "./useHeroControls";
import type { Direction, IPosition } from "../../types/common";
import {
  calculateNewTarget,
  checkCanMove,
  handleMovement,
} from "../../helpers/common";
import { useHeroAnimation } from "./useHeroAnimation";

interface IHeroProps {
  texture: Texture;
  onMove: (gridX: number, gridY: number) => void;
}

export const Hero = ({ texture, onMove }: IHeroProps) => {
  const position = useRef({ x: DEFAULT_POS_X, y: DEFAULT_POS_Y });
  const targetPosition = useRef<IPosition | null>(null);
  const currentDirection = useRef<Direction | null>(null);
  const { getControlsDirection } = useHeroControls();
  const direction = getControlsDirection();
  const isMoving = useRef(false);
  const { sprite, updateSprite } = useHeroAnimation({
    texture,
    frameHeight: 64,
    frameWidth: 64,
    totalFrames: 9,
    animationSpeed: ANIMATION_SPEED,
  });

  useEffect(() => {
    onMove(position.current.x, position.current.y);
  }, [onMove]);

  const setNextTarget = useCallback((direction: Direction) => {
    if (targetPosition.current) return;
    const { x, y } = position.current;
    currentDirection.current = direction;
    const newTarget = calculateNewTarget(x, y, direction);

    if (checkCanMove(newTarget)) {
      targetPosition.current = newTarget;
    }
  }, []);

  useTick((delta) => {
    if (direction) {
      setNextTarget(direction);
    }

    if (targetPosition.current) {
      const { completed, position: newPosition } = handleMovement(
        position.current,
        targetPosition.current,
        MOVE_SPEED,
        delta
      );

      position.current = newPosition;
      isMoving.current = true;

      if (completed) {
        const { x, y } = position.current;
        onMove(x, y);
        targetPosition.current = null;
        isMoving.current = false;
      }
    }

    updateSprite(currentDirection.current!, isMoving.current);
  });

  return (
    <Container>
      {sprite && (
        <Sprite
          texture={sprite.texture}
          x={position.current.x}
          y={position.current.y}
          scale={0.5}
          anchor={[1, 0.8]}
        />
      )}
    </Container>
  );
};
