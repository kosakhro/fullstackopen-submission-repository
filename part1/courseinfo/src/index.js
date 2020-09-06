import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  console.log('Part: ', props)
  return (
  <div>
    {props.part.name} : {props.part.exercises}
  </div>
  )
}

const Header = (props) => {
  console.log('Header', props)
  return <h1>{props.course}</h1>
}

const Total = (props) => {
  console.log('Total: ', props)
  return (
  <div>
    <p>total number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </div>
  )
}

const Content = (props) => { 
  console.log('Content: ', props)
  return (
  <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
  </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
