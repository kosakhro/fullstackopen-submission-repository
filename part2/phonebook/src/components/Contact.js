import React from 'react'


const Contact = ({contact}) => {
    return (
        <div>{contact.name} {contact.number}</div>
    )
  }


export default Contact