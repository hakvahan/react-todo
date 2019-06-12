import React from 'react'
import styled from 'styled-components'

const AddTodo = ({ onAddTodo, listName, type = 'todo' }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onAddTodo(e.target.value, listName, type);
      e.target.value = '';
      e.preventDefault();
    }
  };

  return (
    <Input
      id='todoInput'
      type='text'
      onKeyPress={handleKeyPress}
      placeholder={`Add new ${type}...`}
    />
  )
};

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 2px;
  font-size: 20px;
  height: 40px;
  margin-bottom: 16px;
  margin-top: 10px;
  
  &::placeholder {
    margin-left: 15px;
    color: #8d96a8;
  }
`;

export default AddTodo
