import React from 'react'

export const Total = ({ exercises = [] }) => {
  return (
    <p>Number of exercises {exercises.reduce((acc, next) => acc + next.exercises, 0)}</p>
  )
}
