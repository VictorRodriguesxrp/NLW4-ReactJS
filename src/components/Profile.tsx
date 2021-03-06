import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext"
import styles from "../styles/components/Profile.module.css"

export function Profile() {
  const { level } = useContext(ChallengesContext);
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/VictorRodriguesxrp.png" alt="Victor Rodrigues"/>
      <div>
        <strong>Victor Rodrigues</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          level { level }
        </p>
      </div>
    </div>
  )
}