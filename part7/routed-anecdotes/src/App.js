import { useState } from 'react'
import  useField  from './hooks/myHooks'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Footer from './components/Footer'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom"


const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      author,
      info,
      votes: 0
    })
    navigate('/')
  }

  const clear=(e)=>{
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...{...content, reset: null}} />
        </div>
        <div>
          author
          <input {...{...author, reset: null}} />
        </div>
        <div>
          url for more info
          <input {...{...info, reset: null}} />
        </div>
        <button type='submit'>create</button>
        <button type='reser' onClick={clear}>reset</button>
      </form>
    </div>
  )

}

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log("anecdote content: ", anecdote.content)
    setNotification(`New anecdote: '${anecdote.content}' created!`)
    setTimeout(() => {
      setNotification('')
    }, 3000);
  }

  /*const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }*/

  return (
    
    <Router>
    <h1>Software anecdotes</h1>  
    <Menu/>
    <Routes>
      
      <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
      <Route path="/create" element={<CreateNew addNew={addNew} />} />
      <Route path="/about" element={<About />} />
      <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />  
      
    </Routes>

   
    <Footer/>
   
  </Router> 
    
    

      
      
      
  )
}

export default App
