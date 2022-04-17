import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

export const Statistic = ({ label, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td> {label}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
};

export const Statistics = ({ good, bad, neutral }) => {
  const [positive, setPositive] = useState(0);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    if (good || neutral || bad) {
      setPositive(`${(good / (good + neutral + bad)) * 100}%`);

      setAverage(`${(good - bad) / (good + neutral + bad)}`);
    }
  }, [good, neutral, bad]);

  return (
    <div>
      <h1>Statistics</h1>
      {good || bad || neutral ? (
        <>
          <Statistic label={"Good"} value={good}></Statistic>
          <Statistic label={"Neutral"} value={neutral}></Statistic>
          <Statistic label={"Bad"} value={bad}></Statistic>
          <Statistic label={"All"} value={good + neutral + bad}></Statistic>
          <Statistic label={"Average"} value={average}></Statistic>
          <Statistic label={"Positive"} value={positive}></Statistic>
        </>
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>Good!</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>

      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
