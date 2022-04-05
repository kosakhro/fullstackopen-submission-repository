import React from "react";
import { useDispatch } from "react-redux";
import { notificationChange } from "../reducers/notificationReducer";
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes'

const AnectodeForm=()=>{
    const dispatch = useDispatch();
    const newAnec =  (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value
        console.log('value: ', content)
        //const newAnecdote =  anecdoteService.createNew(content)
        //console.log('new anecdote: ', newAnecdote)
        dispatch(createAnecdote(content))
        dispatch(notificationChange(`lol: '${content}' :)`, 3))
        event.target.anecdote.value = ''
      };
    return (<>
    <h2>create new</h2>
      <form onSubmit={newAnec}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>)
}
export default AnectodeForm;