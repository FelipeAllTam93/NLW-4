import Head from 'next/head';

import {GetServerSideProps} from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/profile";
import ChallengeBox from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
  
interface HomeProps {
    level: number;
    currentExperience: number;
    challengeCompleted: number;
  }

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience ={props.currentExperience}
    challengeCompleted={props.challengeCompleted}>
    <div className={styles.container}>
    <Head>
      <title>Início | Move.it </title>
    </Head>

    <ExperienceBar />

    <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <CountDown />
        </div>

        <div>
          <ChallengeBox />
        </div>
      </section>
    </CountdownProvider>
  </div>
  </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;
 
  return {
    props: { level: Number(level),
    currentExperience: Number(currentExperience),
    challengesCompleted: Number(challengeCompleted)}

  }
}