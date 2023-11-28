import { useState } from "react";

import styles from "./App.module.less";

function App() {
  const [visible, setVisible] = useState(false);
  const startDebug = () => {
    setTimeout(() => {
      // debugger;
    }, 1000);
  };
  return (
    <>
      <div
        className={styles.devtoolsBtn}
        onClick={() => setVisible((val) => !val)}
      >
        点击
      </div>
      {visible && (
        <div className={styles.devtoolsModal}>
          <button onClick={startDebug}>点击Debug</button>
        </div>
      )}
    </>
  );
}

export default App;
