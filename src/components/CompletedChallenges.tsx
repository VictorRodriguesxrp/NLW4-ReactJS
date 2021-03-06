import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"
import styles from "../styles/components/CompletedChallenges.module.css"

export function CompletedChallenges() {
  const { challengesCompleteds } = useContext(ChallengesContext)

  return (
    <div className={styles.CompletedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleteds}</span>
    </div>
  )
}