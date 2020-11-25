import React, { useState } from 'react'
import axios from 'axios';
import { Form, Input, Textarea, StatusMessage } from './styled'

export default function FormSection() {
  const [values, setValues] = useState({
    name: "",
    description: ""
  });
  const [file, setFile] = useState("");
  const [message, setMessage] = useState(true);

  const onSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();        
    formData.append('file', file);

    if(values.name && values.description && file) {
      axios.post('http://localhost:3000/apk', formData, {
        params: {
          name: values.name,
          description: values.description
        }
      })
      .then(function (response) {
        console.log(response);
        setMessage({
          status: true,
          text: "APK file submitted successfully"
        })
        setValues({
          name: '', description: ''
        })
        setFile('');
      })
      .catch(function (error) {
        console.log(error);
        setMessage({
          status: false,
          text: "APK file not submitted successfully, Please retry"
        })
      });
    }else{
      alert('Please fill the required fields including file');
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
      { message && <StatusMessage status={message.status}>{message.text}</StatusMessage> }
    </>
  )
}
