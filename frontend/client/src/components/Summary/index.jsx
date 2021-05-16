import React from 'react'
import { useState, Fragment } from 'react'
import ScrollToTop from "../ScrollToTop/index"


export default function Summary(props) {
  
  const { summary ,users } = props;

  console.log('aaaa',users)
  let tabledata=props.summary.map(sum=> (
    <tr>
          <td>{sum.name}</td>
          <td>{sum.grams_wasted}</td>
          <td>{sum.units_wasted}</td>
          <td>{sum.grams_saved}</td>
          <td>{sum.units_saved}</td>
    </tr>
  ))

  return (
    
    <section>
      <h1>Summary Page</h1>
      <h3> Hello {users[0]['name']} Your Current Score is: <strong>{users[0]['score']}</strong> </h3>

      <table>
        <tr>
          <th>Product Name</th>
          <th> Quantity Wasted(g) </th>
          <th> Units Wasted</th>
          <th> Quantity Saved(g) </th>
          <th> Units Saved</th>
        </tr>
        {tabledata}
      </table>
   

    <ScrollToTop />
    </section>
  )
}
