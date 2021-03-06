import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
  closeLevelUpModal: () => void,
}

interface ChallengesProviderProps{
  children: ReactNode;
  level: number,
  currentExperience: number,
  challengesCompleteds: number
}

export const ChallengesContext = createContext({} as ChallengesContextDate);
//...rest está transformando todas as váriaveis do homeprops exceto a children
//em um objeto, para não duplicar com as variáveis já existentes (level/ currentExperience/ setCurrentExperience)
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleteds, setChallengesCompleteds] = useState(rest.challengesCompleteds ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2)
  
  //passando o segundo parâmetro do useEffect com um array vazio significa
  //que ele só será executado uma vez quando o componente for exibido em tela
  useEffect(() => {
    Notification.requestPermission;
  }, [])

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleteds", String(challengesCompleteds));
  }, [level, currentExperience, challengesCompleteds]);

  function levelUp () {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }
  
  function closeLevelUpModal () {
    setIsLevelUpModalOpen(false);
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
        completeChallenge,
        closeLevelUpModal
      }}>
      {children}

      if {isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}