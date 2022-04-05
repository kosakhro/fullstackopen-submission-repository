import React from "react";
import { useDispatch } from "react-redux";
import { notificationChange } from "../reducers/notificationReducer";
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnectodeForm=()=>{
    const dispatch = useDispatch();
    const newAnec = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value
        dispatch(createAnecdote(content))
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