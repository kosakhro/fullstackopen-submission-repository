import React, { useState } from 'react'
import Filter from './components/Filter'
import Contact from './components/Contact'
import PersonForm from './components/PersonForm'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('njkj')
  const [ newNumber, setNewNumber ] = useState('123')
  const [searchValue, setSearchValue] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((contact) => contact.name.toLowerCase());
    console.log(names.indexOf(newName))
    if (names.indexOf(newName) === -1){
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else window.alert(`${newName} is already added to phonebook`)
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
        {personsToShow.map(person => 
          <Contact key={person.name} contact={person} />
        )}
      </div>
    </div>
  )
}

export default App