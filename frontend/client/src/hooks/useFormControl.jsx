import { useState } from 'react'


export default function useFormControl(initialFields, action) {
  const [formData, setFormData] = useState(initialFields)

  const handleSubmit = (event) => {
    event.preventDefault()

    action(formData)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
    
  }
  return { formData, handleSubmit, handleChange }
}

