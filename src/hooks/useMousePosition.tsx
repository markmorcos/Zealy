import React from "react";

import { ICoordinates } from "../types";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState<ICoordinates>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};
