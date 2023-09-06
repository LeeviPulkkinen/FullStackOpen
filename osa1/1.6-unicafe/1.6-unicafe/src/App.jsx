import { useState } from "react";

const Header = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const StatisticLine = ({ name, value }) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
    <table>
      <tbody>
      <StatisticLine name="good" value={good} />
      <StatisticLine name="neutral" value={neutral} />
      <StatisticLine name="bad" value={bad} />
      <StatisticLine name="total" value={good + neutral + bad} />
      <StatisticLine
        name="average"
        value={(good - bad) / (good + neutral + bad)}
      />
      <StatisticLine
        name="positive"
        value={(good / (good + neutral + bad)) * 100 + " %"}
      />
      </tbody>
    </table>
    </>
  );
};

const App = () => {
  const title = "give feedback";
  const sub_title = "statistics";
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title={title} />

      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />

      <Header title={sub_title} />

      <Statistics
        sub_title={sub_title}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
