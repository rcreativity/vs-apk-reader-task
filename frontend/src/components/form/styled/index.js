import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`

const Input = styled.input`
  display: block;
  width: 300px;
  padding: 10px;
  margin: 10px;

  &&.submit{
    background: green;
    border: none;
    color: #fff;
    font-size: 18px;
  }
`

const Textarea = styled.textarea`
  display: block;
  width: 300px;
  padding: 10px;
  margin: 10px;
`

const StatusMessage = styled.h3`
  color: ${props => props.status ? "green" : "red"};
`

export { Form, Input, Textarea, StatusMessage};