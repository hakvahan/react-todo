import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #3b4049;
  color: white;
  margin-right: 1em;
  padding: 0.5em 1.5em;
  
  &.active {
    background-color: #3b4049
    color: white;
    font-weight: 600;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start !important;
`;

export const Filter = ({filterList, selectedFilterType}) => {
  const filter = (type) => {
    return () => {
      filterList(type)
    }
  };
  
  return (
    <Container>
      <Button className={`${selectedFilterType === 'all' ? 'active' : ''}`}
              onClick={filter('all')}>All</Button>
      <Button className={`${selectedFilterType === 'active' ? 'active' : ''}`}
              onClick={filter('active')}>Active</Button>
      <Button className={`${selectedFilterType === 'completed' ? 'active' : ''}`}
              onClick={filter('completed')}>Completed</Button>
    </Container>
  )
};
