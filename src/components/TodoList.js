import React from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'

const TodoList = ({ items, toggleComplete, listName }) => (
  <Wrapper>
    {items.map(item => {
      const onComplete = e => {
        toggleComplete(item.id, listName)
      };

      return <TodoItem key={item.id} {...item} onComplete={onComplete} />
    })}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TodoList
