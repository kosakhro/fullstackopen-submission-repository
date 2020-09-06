import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  console.log('Part: ', props)
  return (
  <div>
    {props.part}: {props.exercises}
  </div>
  )
}

const Header = (props) => {
  console.log('Header', props)
  return <h1>{props.course}</h1>
}

const Total = (props) => (
  <div>
    <p>total number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </div>
)
const Content = (props) => { 
  console.log('Content: ', props)
  return (
  <div>
    <Part part={props.parts[0].name}exercises={props.parts[0].exercises}/>
    <Part part={props.parts[1].name}exercises={props.parts[1].exercises}/>
    <Part part={props.parts[2].name}exercises={props.parts[2].exercises}/>
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
