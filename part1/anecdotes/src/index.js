import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const AnecdoteOfTheDay = (props) => {
  const [selected, setSelected] = useState(0);

  const onNextAnecdote = () => {
    let rand = selected;
    while (rand === selected) {
      rand = Math.floor(Math.random() * props.anecdotes.length);
    }
    setSelected(rand);
  };

  const onVoteAnecdote = () => props.voteAnecdote(selected);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>

      <p>
        {props.votes[selected] !== 0
          ? `Has ${props.votes[selected]} votes`
          : "Has no votes"}
      </p>
      <button onClick={onVoteAnecdote}>Vote</button>
      <button onClick={onNextAnecdote}>Next anecdote</button>
    </div>
  );
};

const AnecdoteMostVoted = (props) => {
  const [mostVoted, setMostVoted] = useState(null);

  useEffect(() => {
    const votes = Object.values(props.votes);
    function findMostVoted(votes) {
      const arrayVotesValues = Object.values(votes);
      const maxVotes = Math.max(...arrayVotesValues);
      const index = arrayVotesValues.findIndex((v) => v === maxVotes);

      return index;
    }

    const indexAnecdoteMostVoted = findMostVoted(votes);
    setMostVoted(indexAnecdoteMostVoted);
  }, [props.votes]);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[mostVoted]}</p>
      <p>
        {props.votes[mostVoted] !== 0
          ? `Has ${props.votes[mostVoted]} votes`
          : "Has no votes"}
      </p>
    </div>
  );
};

const App = (props) => {
  const [votes, setVotes] = useState(
    props?.anecdotes?.reduce((prev, next, index) => {
      return { ...prev, [index]: 0 };
    }, {})
  );

  const onAnecdoteVoted = (index) => {
    const copyVotes = { ...votes };
    copyVotes[index] = copyVotes[index] + 1;
    setVotes(copyVotes);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={props.anecdotes}
        votes={votes}
        voteAnecdote={(index) => onAnecdoteVoted(index)}
      />
      <AnecdoteMostVoted anecdotes={props.anecdotes} votes={votes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
