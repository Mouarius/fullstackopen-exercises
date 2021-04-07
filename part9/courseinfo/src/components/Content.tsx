import React from 'react'
import { Course } from '../types'

interface ContentProps {
  courseParts: Course[]
}

const Content:React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.courseParts.map(course => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
    </div>
  )
}

export default Content
