import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';




interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;


export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider( { children }: CountdownProviderProps ) {
    const { startNewChallenge } = useContext(ChallengesContext);


    const [ time, setTime] = useState(0.1 * 60);
    const [ isActive, setIsActive ] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    function resetCountDown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    function startCountDown(){
        setIsActive(true);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time] )
    
    return(
        <CountdownContext.Provider value={{minutes, seconds, hasFinished, isActive, startCountDown, resetCountDown}}>
            {children}
        </CountdownContext.Provider>
    )
}