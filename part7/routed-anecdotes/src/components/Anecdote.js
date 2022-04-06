import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id;
    const anecdote = anecdotes.find((a) => Number(a.id) === Number(id));
    return (
      <>
        <h3>{anecdote.content}</h3>
        <h3>has {anecdote.votes} votes</h3>
      </>
    )
  }

export default Anecdote  