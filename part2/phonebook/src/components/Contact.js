import React from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Contact = ({contact, onClick}) => {
    return (
        <div>{contact.name} {contact.number} <Button handleClick={() => onClick(contact.id)} text='delete' /></div>
    )
  }


export default Contact