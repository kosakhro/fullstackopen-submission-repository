import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Contact from './components/Contact'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'





const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [changeMessage, setChangeMessage] = useState(null)



  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((contact) => contact.name.toLowerCase());
    console.log(names.indexOf(newName))
    if (names.indexOf(newName) === -1){
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setChangeMessage(`Added .${newName}.`)
      setTimeout(() => {
        setChangeMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
      })
      
      
      .catch(error => {
        console.log(error.response.data)
        setChangeMessage(error.response.data.error)
      setTimeout(() => {
        setChangeMessage(null)
      }, 5000)
      })
    }
    else if (window.confirm(`${newName} is already added to phonebook, replace the phone number with new one?`)){
      const person = persons.find(n => n.name === newName)
      console.log('person number:', person.number);
      const changedPerson = { ...person, number: newNumber }
      console.log('changed person number:', changedPerson.number);
    
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== person.id))     
        })
        

    }



  }


  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
     personService.deleteContact(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
     })
    }
  }


  const handleNamePresent = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberPresent = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleSearchPresent = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(searchValue.toLowerCase()) === true)


  return (       
    <div>
      <h2>Phonebook</h2>

      <Notification message={changeMessage} />


      <Filter searchValue = {searchValue} handleSearchPresent = {handleSearchPresent} />

         
      <h2>add a new</h2>

      <PersonForm 
      addPerson={addPerson} 
      newName={newName}
      handleNamePresent={handleNamePresent}
      newNumber={newNumber}
      handleNumberPresent={handleNumberPresent}  
      />


      <h2>Numbers</h2>

      <div>
        {personsToShow.map(person =>  <Contact key={person.name} contact={person} onClick = {handleDelete} />)}
      </div>
    </div>
  )
}

export default App