import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ text, handleClick }) => (
  < button onClick={handleClick} >
    {text}
  </button >
)

const Statistics = (props) => {
  const { good, neutral, bad } = props.stats
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good * 1 + bad * -1) / all} />
        <StatisticLine text="positive" value={(good) / all * 100 + " %"} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = {
    "good": good,
    "neutral": neutral,
    "bad": bad
  }

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Header title="statistics" />
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
