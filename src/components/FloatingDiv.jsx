import React, { useState, useEffect } from "react";

const FloatingDiv = ({
  children,
  className = "",
  style = {},
  interval = 2000,
  maxDistance = 50,
  maxTilt = 10,
}) => {
  const [transform, setTransform] = useState("");

  useEffect(() => {
    const animateDiv = () => {
      const xMove = Math.random() * maxDistance * 1.4 - maxDistance;
      const yMove = Math.random() * maxDistance * 2 - maxDistance;
      const tilt = Math.random() * maxTilt * 2 - maxTilt;

      setTransform(`translate(${xMove}px, ${yMove}px) rotate(${tilt}deg)`);
    };

    animateDiv(); // Initial animation
    const intervalId = setInterval(animateDiv, interval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [interval, maxDistance, maxTilt]);

  return (
    <div
      className={`floating-div ${className}`}
      style={{
        ...style,
        transform,
        transition: `transform ${interval / 1000}s ease-in-out`,
      }}
    >
      {children}
    </div>
  );
};

export default FloatingDiv;
