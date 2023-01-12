import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }
    setLoading(true);

    
    try {
      const response = await fetch("/api/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  gender, age, symptoms }),
      });
      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result.replaceAll('\n', '<br/>'));
    
    } catch (error) {
      alert("Please refresh the page and try again.", error.message );
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>LaVida Health Buddy 😎</title>
        <meta name="description" content="A symptom checker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/download.png" />
      </Head>

      <main className={styles.main}>
        <h3>LaVida Health Buddy😎</h3>
        <form onSubmit={onSubmit}>

        <label>Please what's your Gender?</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Please what is your Age?</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter the age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>What problem are you facing?</label>
          <input
            type="text"
            name="symptoms"
            placeholder="Enter the Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <input type="submit" value="Check Up" />

        </form>
        {loading && (
          <div className={styles.load}>
            <h3>Loading possible Conditions</h3>
            <img src="/loading.gif" className={styles.loading}/>
          </div>
        )}
        <div
        className={styles.result}
        dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}
