import React from "react";
import { connect } from "react-redux";
import { notificationChange } from "../reducers/notificationReducer";
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnectodeForm=(props)=>{
    const newAnec =  (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value
        console.log('value: ', content)
        props.createAnecdote(content)
        props.notificationChange(`lol: '${content}' :)`, 3)
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

const mapDispatchToProps = {
  createAnecdote,
  notificationChange,
};
export default connect(null, mapDispatchToProps)(AnectodeForm);