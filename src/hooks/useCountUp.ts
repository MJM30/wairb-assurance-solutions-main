import { useState, useEffect } from "react";

/**
 * A hook that animates a number from 0 to a target value.
 * @param end The target number to count up to.
 * @param duration Duration of the animation in milliseconds.
 * @param startTrigger Whether to start the animation.
 */
export const useCountUp = (end: number, duration: number = 2000, startTrigger: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) {
      setCount(0);
      return;
    }

    let startTime = Date.now();

    const intervalId = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 3); 
      setCount(Math.floor(easedProgress * end));

      if (progress >= 1) {
        clearInterval(intervalId);
      }
    }, 16);

    return () => clearInterval(intervalId);
  }, [end, duration, startTrigger]);

  return count;
};
