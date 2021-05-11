import React from 'react'

export default function ProductItem(props) {
  return (
    <div>
      <li>
        <h2>{props.name}</h2>
      </li>
      <li>
        <h2>{props.expiration_date}</h2>
      </li>
      <li>
        <h2>{props.quantity_grams}</h2>
      </li>
      <li>
        <h2>{props.quantity_units}</h2>
      </li>
    </div>
  )
}
