import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => (
  < button onClick={handleClick} >
    {text}
  </button >
)

const Votes = ({ votes }) => <p>has {votes} votes</p>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setAll] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))

  console.log(allVotes)

  const addVote = () => {
    const updatedVotes = [...allVotes]
    updatedVotes[selected] += 1
    setAll(updatedVotes)
  }
  console.log(props.anecdotes[(allVotes.indexOf(Math.max(...allVotes)))])
  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <Votes votes={allVotes[selected]} />
      <Button text="vote" handleClick={() => addVote()} />
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} />
      <Header text="Anecdote with most votes" />
      <p>{props.anecdotes[(allVotes.indexOf(Math.max(...allVotes)))]}</p>
      <p>has {Math.max(...allVotes)} votes</p>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)