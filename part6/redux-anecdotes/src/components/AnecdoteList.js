import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";


const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    //console.log(state.anecdotes)

    return state.anecdotes;
  });
  const dispatch = useDispatch()

  const filter = useSelector((state) => {
    return state.filter;
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .filter((a) => a.content.includes(filter))
        .sort((a, b) => {
          if (a.votes > b.votes) return -1;
          else return 1;
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
            has {anecdote.votes}
        <button onClick={() => {
          console.log(anecdote.id)
          dispatch(voteAnecdote(anecdote.id))   
          dispatch(notificationChange(`Stop voting for stale jokes: '${anecdote.content}'`))
          setTimeout(() => {
            dispatch(notificationChange(null))
          }, 5000)
        }
          }>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList