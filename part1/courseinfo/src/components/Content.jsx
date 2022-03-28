import React from 'react'
import { Part } from './ContentPart'

export const Content = ({ content = [] }) => {
  return <div>
      { content.map((c) => <Part {...c} />)}
  </div>
}