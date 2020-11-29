import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({ good, neutral, bad }) => {
  var total = good + bad + neutral
  var average = Math.round((- bad + good)/(total) * 100) / 100
  var positive =  Math.round(good / total * 10000) / 100
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
    <h1>statistics</h1>
    <table>
        <tbody>
            <Record text="good: " value={good} />
            <Record text="neutral: " value={neutral} />
            <Record text="bad: " value={bad} />
            <Record text="all: " value={total} />
            <Record text="average: " value={average} />
            <Record text="positive: " value={positive + "%"} />
        </tbody>
    </table>

</div>
  )
}


const Record = ({ text, value }) => {
  return (
      <tr>
          <td>{text}</td>
          <td>{value}</td>
      </tr>
  )
}


const Button = ({handleClick, text}) => 
   (
    <button onClick={handleClick}>
      {text}
    </button>
  )



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    //setAll(allClicks.concat('L'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    //setAll(allClicks.concat('R'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    //setAll(allClicks.concat('R'))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />


      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)