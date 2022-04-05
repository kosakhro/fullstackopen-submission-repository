import anecdoteService from "../services/anecdotes";

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

//const initialState = anecdotesAtStart.map(asObject);

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote =await anecdoteService.createNew(content);
    
    return dispatch({type:'NEW_ANECDOTE',data:newAnecdote});

  }
};
export const voteAnecdote = (id) => {
  return async dispatch=>{
    //console.log(id)
    //console.log(updatedAnecdote)

    await anecdoteService.updateVote(id);
    return dispatch({type:'VOTE',data:{id}})
  }
};

export const initializeAnecdotes =()=>{
  return async dispatch => {
    const anecdotes= await anecdoteService.getAll();
    return dispatch({type:'INIT_ANECDOTES',data:anecdotes})
  }
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    default:
      return state;
    case "NEW_ANECDOTE":
      //console.log(action.data)
      return [...state, action.data];
    case "INIT_ANECDOTES":
      //console.log(action.data)
      return action.data
  }
};

export default anecdoteReducer;