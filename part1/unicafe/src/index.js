import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) => {
  const percent = (text==="positive")?" %":"";
  return(
    <tr>
      <td>{text} :</td>
      <td>{value}{percent}</td>
    </tr>
  )
}

const Statistics = ({numbers}) => {
  const [numberGood, numberNeutral, numberBad] = numbers

  //COMPUTED VALUES
  const all = numberBad + numberNeutral + numberGood;

  var average = 0
  if (all !== 0){
    average = (numberGood - numberBad)/all
  }

  var positive = 0
  if (all !== 0){
    positive = (numberGood)/all*100
  }
  if(all === 0){
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback has been given yet.</p>
      </div>
      
    )
  }else{
    return(
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={numberGood}/>
            <Statistic text="neutral" value={numberNeutral}/>
            <Statistic text="bad" value={numberBad}/>
            <Statistic text="all" value={all}/>
            <Statistic text="average" value={average}/>
            <Statistic text="positive" value={positive}/>
          </tbody>
        </table>
      </div>
    )
  }
  
}

const Button = ({clickHandler, text}) => (
  <button onClick={clickHandler}>{text}</button>
)


const App = () => {
  const [numberGood, setNumberGood] = useState(0);
  const [numberNeutral, setNumberNeutral] = useState(0);
  const [numberBad, setNumberBad] = useState(0);

  
  //Note : the computed statistic values don't have to be states, they are direcly calculated at each re-render, we don't have to create a new complex state just to re render it.

  const addGood = () => {
    setNumberGood(numberGood + 1)
  }
  const addNeutral = () => {
    setNumberNeutral(numberNeutral + 1)
  }
  const addBad = () => {
    setNumberBad(numberBad + 1)
  }


  return(
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={addGood} text={"good"}/>
      <Button clickHandler={addNeutral} text={"neutral"}/>
      <Button clickHandler={addBad} text={"bad"}/>

      <Statistics numbers = {[numberGood, numberNeutral, numberBad]}/>
    </div>
  )

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);