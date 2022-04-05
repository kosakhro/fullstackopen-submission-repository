import React from "react";
import { useDispatch } from "react-redux";
import { notificationChange } from "../reducers/notificationReducer";
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes'

const AnectodeForm=()=>{
    const dispatch = useDispatch();
    const newAnec = async(event) => {
        event.preventDefault();
        const content = event.target.anecdote.value
        console.log(content)
        const newAnecdote = await anecdoteService.createNew(content)
        console.log(newAnecdote)
        dispatch(createAnecdote(newAnecdote))
        dispatch(notificationChange(`lol: '${content}' :)`))
        event.target.anecdote.value = ''
        setTimeout(() => {
          dispatch(notificationChange(null))
        }, 5000)
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