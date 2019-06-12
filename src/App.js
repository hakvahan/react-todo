import React from 'react'
import { Provider, Subscribe } from 'unstated'
import styled from 'styled-components'
import TodosContainer from './store'
import ListWrapper from './components/ListWrapper';
import AddTodo from "./components/AddTodo";

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
            {todos => {
              const lists = todos.getLists();
              return <Container>
                <AddTodo type='list' onAddTodo={todos.createTodo} />
                <ListsWrapper>
                  {Object.keys(lists).map((listItem) => {
                    return <ListWrapper list={listItem} {...todos} key={listItem}/>
                  })}
                </ListsWrapper>
              </Container>
            }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  overflow: scroll;
`;

const ListsWrapper = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

export default App
