import React from 'react'

const Header = ({ course }) => (
    <h1>{course.name}</h1>
  );
  
  const Content = ({ course }) => {
    const parts = [...course.parts]
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    )
  };
  
  const Part = ({ part }) => {
    return (<p>{part.name} {part.exercises}</p>);
  }
  
  const Course = ({ course }) => (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
  
  const Total = ({ course }) => {
    const total = course.parts.map(part => part.exercises).reduce((accumulator, currentValue) => {
      return (accumulator + currentValue)
    })
    return (
      <strong>Number of exercises {total}</strong>
    )
  }

export default Course;