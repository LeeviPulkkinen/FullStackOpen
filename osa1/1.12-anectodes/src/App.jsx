import { useState } from "react";

const findIndexOfHighestVotes = (vote_array) => {
  let highest_index = 0;
  let highest_value = vote_array[0];

  for(var i = 1; i < vote_array.length; i++) {
    if (vote_array[i] > highest_value) {
      highest_value = vote_array[i];
      highest_index = i
    }
  }
  return highest_index;
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const points = Array(anecdotes.length).fill(0);

  const [votes, setVotes] = useState(points);

  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button
        onClick={() => {
          const selected_value = votes[selected];
          const copy = [...votes];

          copy[selected] = selected_value + 1;

          setVotes(copy);
        }}
      >
        vote
      </button>
      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      >
        next anecdote
      </button>
      <h1>Anectode with the most votes</h1>
      <p>{anecdotes[findIndexOfHighestVotes(votes)]}</p>
    </div>
  );
};

export default App;
