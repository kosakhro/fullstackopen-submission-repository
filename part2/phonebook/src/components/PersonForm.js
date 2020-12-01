import React from 'react'


const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
        <div>
          name: <input 
                  value={props.newName}
                  onChange={props.handleNamePresent}
                  />
        </div>
        <div>
          number: <input 
                  value={props.newNumber}
                  onChange={props.handleNumberPresent}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }


export default PersonForm