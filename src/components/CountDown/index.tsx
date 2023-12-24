import { useEffect, useRef, useState } from "react";

import styles from "./index.module.less";

export interface CountDownProps {
  initial: number;
  onDestroy?: () => void;
}
function CountDown({
  initial = 5,
  onDestroy
}: React.PropsWithChildren<CountDownProps>) {
  // 是否立刻执行
  const immediately = initial <= 0;
  const [count, setCount] = useState(initial);
  const timer = useRef<any>();
  useEffect(() => {
    if (immediately) {
      onDestroy?.();
      // 立刻执行
      /* eslint-disable */
      debugger;
      return;
    }
    timer.current = setInterval(() => {
      setCount((val) => {
        const newVal = val - 1;
        if (newVal <= 0) {
          timer.current && clearInterval(timer.current);
          // 不阻塞主线程
          setTimeout(() => {
            /* eslint-disable */
            debugger;
          });
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
    !immediately && (
      <div className={styles.countDownMask}>
        <div className={styles.countDown}>{count}</div>
      </div>
    )
  );
}

export default CountDown;
