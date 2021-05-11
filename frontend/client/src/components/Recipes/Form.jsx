import { useState } from 'react'


export default function Form(props) {
  const [formData,setFormData] = useState({ingredients:''})
  
  const handleSubmit = (event) => {
    event.preventDefault()
    props.onSubmit(formData)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h1>Please enter ingredients</h1>
      <input
          type="text"
          name='ingredients'
          value={formData.ingredients}
          onChange={handleChange}
          placeholder='apples,oranges'
        ></input>
    </form>
  )

}