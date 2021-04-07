import React from 'react'
import { Course } from '../types'

interface TotalProps {
  courseParts: Course[]
}

const Total:React.FC<TotalProps> = (props) => {
  return (
    <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  )
}

export default Total
