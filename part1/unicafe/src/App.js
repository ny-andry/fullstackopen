import { useState } from "react";

const Header = (props) => <h2>{props.text}</h2>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => (
  <>
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.count} />
        <StatisticLine text="Average" value={props.average} />
        <StatisticLine text="Positive" value={props.positive} />
      </tbody>
    </table>
  </>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let count = good + neutral + bad;
  let average = count ? (good - bad) / count : 0;
  let positive = (count ? good / count : 0) * 100 + " %";

  return (
    <div>
      <Header text={"Give Feedback"} />

      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
        text="Good"
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
        text="Neutral"
      />
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
        text="Bad"
      />

      <Header text={"Statistics"} />

      {count === 0 ? (
        <p> No feedback given</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          count={count}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

export default App;
