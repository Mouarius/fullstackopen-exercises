import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>{props.course.name}</h1>
);

const Content = (props) => {
  var parts = [];
  for (let i=0 ; i < props.course.parts.length ; i++){
    parts.push(props.course.parts[i]);
  }
  return(
    <div>
      <Part part= {parts[0]}/>
      <Part part= {parts[1]}/>
      <Part part= {parts[2]}/>
    </div>
  )};

const Part = (props) => {
  return(<p>{props.part.name} {props.part.exercises}</p>);
}

const Total = (props) => {
  let total = 0;
  for(let i = 0 ; i<props.course.parts.length ; i++){
      total = total + props.course.parts[i].exercises;
  }
  return(
    <p>Number of exercises {total}</p>
  )};

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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))