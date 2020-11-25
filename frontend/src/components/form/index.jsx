import React, { useState } from 'react'
import axios from 'axios';
import { Form, Input, Textarea } from './styled'

export default function FormSection() {
  const [values, setValues] = useState({
    name: "Cool Man App",
    description: "Cool Man App Description"
  });
  const [file, setFile] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();        
    formData.append('file', file);

    const { name, description } = values;
    if(name && description) {
      console.log(values, file)
      axios.post('http://localhost:3000/apk', formData, {
        params: {
          name,
          description,
          version: '4.0',
          size: '6MB'
        },
        body: {
          file
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      console.log('Please fill the required fields');
    }
  }

  const handleChange = event => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: value
    });
  };

  const handleUpload = event => {
    setFile(event.target.files[0]);
  }

  const { name, description } = values;
  
  return (
    <>
      <h1>Submit APK File</h1>
      <Form onSubmit={onSubmitForm}>
        <Input type="text" placeholder="name" value={name} name="name" onChange={handleChange} />
        <Textarea placeholder="description" value={description} name="description" rows="4" cols="50" onChange={handleChange} />
        <Input type="file" onChange={handleUpload} />
        <Input type="submit" className="submit" value="submit"/>
      </Form>
    </>
  )
}
