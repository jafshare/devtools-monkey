import { useEffect, useRef, useState } from "react";

import styles from "./index.module.less";

export interface CountDownProps {
  initial: number;
  onDestroy?: () => void;
}
function CountDown({ initial = 5, onDestroy }: CountDownProps) {
  const [count, setCount] = useState(initial);
  const timer = useRef<any>();
  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((val) => {
        const newVal = val - 1;
        if (newVal <= 0) {
          timer.current && clearInterval(timer.current);
          onDestroy?.();
        }
        return newVal;
      });
    }, 1 * 1000);
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, []);
  return (
    <div className={styles.countDownMask}>
      <div className={styles.countDown}>{count}</div>
    </div>
  );
}

export default CountDown;
