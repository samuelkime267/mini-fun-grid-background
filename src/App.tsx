import useWindowSize from "./hooks/useWindowSize";
import gsap from "gsap";
import { useEffect, useRef } from "react";

function App() {
  const { width, height } = useWindowSize();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || width === 0 || height === 0) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef.current);
      const gridCells = q(".grid-cell");

      gridCells.forEach((cell) => {
        cell.addEventListener("mouseenter", () => {
          gsap.to(cell, {
            backgroundColor: "white",
            duration: 0,
            // ease: "power1.in",
          });
        });
        cell.addEventListener("mouseleave", () => {
          gsap.to(cell, {
            backgroundColor: "black",
            duration: 1,
          });
        });
      });
    });

    return () => ctx.revert();
  }, [width, height]);

  const gridSize = 100;
  const widthCount = Math.trunc(width / gridSize) + 1;
  const heightCount = Math.trunc(height / gridSize) + 1;
  const widthArr = Array.from({ length: widthCount }, (_, i) => i);
  const heightArr = Array.from({ length: heightCount }, (_, i) => i);

  return (
    <main ref={containerRef} className="w-full h-screen overflow-hidden">
      {heightArr.map((_, i) => (
        <div key={i} className="flex">
          {widthArr.map((_, j) => (
            <div
              key={j}
              style={{ width: gridSize, height: gridSize }}
              className="bg-black grid-cell"
            />
          ))}
        </div>
      ))}
    </main>
  );
}

export default App;
