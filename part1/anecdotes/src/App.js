import { useState } from "react";

const Section = (props) => {
  return (
    <div>
      <h1> {props.header} </h1>
      <p>
        {props.paragraph[props.index]}
        <br />
        Have {props.vote[props.index]} votes
        <br />
      </p>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // Voting function
  const handleVote = () => {
    const spreadVotes = [...votes];
    // console.log(spreadVotes);
    spreadVotes[selected] += 1;
    return setVotes(spreadVotes);
  };

  // Random anecdote function
  const handleAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <div>
      <Section
        header={"Anecdote of the day"}
        paragraph={anecdotes}
        vote={votes}
        index={selected}
      />

      <Button handleClick={handleVote} text="Vote" />
      <Button handleClick={handleAnecdote} text="Next anecdote" />

      <Section
        header={"Anecdote with most votes"}
        paragraph={anecdotes}
        vote={votes}
        index={votes.indexOf(Math.max(...votes))}
      />
    </div>
  );
};

export default App;
