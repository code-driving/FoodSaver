import React from 'react'
import { useState, Fragment } from 'react'
import ScrollToTop from "../ScrollToTop/index"
import './Summary.scss'


export default function Summary(props) {
  
  const { summary, users } = props;
  let name = ''
  let score = 0
  
  if (users) {
    name = users[0]['name']
    score = users[0]['score']
  }
  
  console.log('aaaa',users)
  let tabledata=props.summary.map(sum=> (
    <tbody>
      <tr>
        <td>{sum.name}</td>
        <td>{sum.grams_wasted}</td>
        <td>{sum.units_wasted}</td>
        <td>{sum.grams_saved}</td>
        <td>{sum.units_saved}</td>
      </tr>
    </tbody>
  ))

  return (
    
    <section className="summary_section">
      <h1 style={{marginBottom: '1.5rem'}}>Summary Page</h1>
      <h1>Hello, {name}!</h1> 
      <h2>Your Current Score is: <span>{score}</span></h2>

      <table className='summary_table'>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity Wasted(g)</th>
          <th>Units Wasted</th>
          <th>Quantity Saved(g)</th>
          <th>Units Saved</th>
        </tr>
      </thead>
        {tabledata}
      </table>
    <ScrollToTop />
    </section>
  )
}
