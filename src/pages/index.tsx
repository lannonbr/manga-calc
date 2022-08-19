import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Home: NextPage = () => {

  const [booksOwned, setBooksOwned] = useState(0)
  const [booksRead, setBooksRead] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [percentageRead, setPercentageRead] = useState(0)
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    if (booksOwned === 0) {
      setPercentageRead(0)
    } else {
      setPercentageRead(booksRead / booksOwned * 100)
    }

    const day = dayjs()
    const nextMonth = day.startOf("month").add(1, "month")

    setDaysLeft(nextMonth.diff(day, "days"))
  }, [booksOwned, booksRead, percentage])

  return (
    <>
      <Head>
        <title>Manga Calc</title>
        <meta name="description" content="Manga Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold uppercase m-4">Manga Calc</h1>

      <div className="flex flex-col w-96 border-black border-2 m-8 p-4">
        <label htmlFor="booksRead">Books Read:</label>
        <input name="booksRead" placeholder="Books read" type="number" onChange={e => setBooksRead(+e.target.value)} className="m-5 w-30 p-2 h-10 border border-black"/>
        <label htmlFor="booksOwned">Books Owned:</label>
        <input name="booksOwned" placeholder="Books owned" type="number" onChange={e => setBooksOwned(+e.target.value)} className="m-5 w-30 p-2 h-10 border border-black"/>
        <label htmlFor="percentage">Percentage to complete this month:</label>
        <input name="percentage" placeholder="percentage" type="number" onChange={e => setPercentage(+e.target.value)} className="m-5 w-30 p-2 h-10 border border-black"/>
      </div>

      <section className="ml-4">
        <p>{booksRead} / {booksOwned} ({percentageRead}%)</p>
        <p className="mb-4">days left this month: {daysLeft}</p>
        
        {percentageRead > percentage ? (
          <p>You've hit your goal for this month so far</p>
        ) : (
          <>
            <p>You want to get to {percentage}% read by the end of the month which will be {Math.floor(percentage / 100 * booksOwned)} books</p>
            <p>You've alread read {booksRead} books, so you only need to read {Math.floor(percentage / 100 * booksOwned) - booksRead} more.</p>
            <p>{Math.ceil((Math.floor(percentage / 100 * booksOwned) - booksRead) / daysLeft)} books per day</p>
          </>
        )}
      </section>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {}
  }
}