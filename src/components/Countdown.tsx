import { useContext } from "react"
import { CountdownContext } from "../contexts/CountdownContexts";
import styles from "../styles/components/Countdown.module.css"

export function Countdown() {
  
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useContext(CountdownContext)
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  // executa a useEffect a cada vez que o active muda e que o time muda.

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>

      ) : (
        //Só é possível fazer um else neste caso colocando os botões dentro de uma div ou fragment
          <>
            {
              isActive ? (
                <button
                  type="button"
                  className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                  onClick={resetCountdown}
                >
                  Abandonar Ciclo
                </button>
              ) : (
                  <button
                    type="button"
                    className={`${styles.countdownButton}`}
                    onClick={startCountdown}
                  >
                    Iniciar um ciclo
                  </button>
                )}
          </>
        )}


    </div>
  )
}