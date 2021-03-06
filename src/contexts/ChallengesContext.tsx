import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesContextDate {
  level: number,
  currentExperience : number, 
  challengesCompleteds: number,   
  levelUp: () => void, 
  startNewChallenge: () => void,
  activeChallenge: Challenge;
  resetChallenge : () => void,
  experienceToNextLevel: number
  completeChallenge: () => void,
}

interface ChallengesProviderProps{
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextDate);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleteds, setChallengesCompleteds] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2)
  
  //passando o segundo parâmetro do useEffect com um array vazio significa
  //que ele só será executado uma vez quando o componente for exibido em tela
  useEffect(() => {
    Notification.requestPermission;
  }, [])

  function levelUp () {
    setLevel(level + 1);
  }
  
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === "granted") {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }
    
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience > experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleteds(challengesCompleteds + 1);
  }
  
  //Exportando as funções para serem utilizadas nos componentes
  return (  
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleteds,   
        levelUp, 
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}