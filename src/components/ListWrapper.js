import React from "react";
import AddTodo from "./AddTodo";
import { Filter } from "./Filter";
import TodoList from "./TodoList";
import styled from "styled-components";

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

class ListWrapper extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      toggled: false,
      filterType: 'all',
      filteredItems: []
    }
  }
  
  toggle = () => {
    this.setState({toggled: !this.state.toggled})
  };
  
  filterList = (type) => {
    this.setState({filterType: type})
  };
  
  componentDidMount () {
    const { getListItems, list } = this.props;
    const items = getListItems(list);
    this.setState({items})
  }
  
  render() {
    const { createTodo, toggleComplete, list, getListItems } = this.props;
    const { toggled, filteredItems, filterType } = this.state;
    const items = getListItems(list, filterType);
    
    return (
      <div className="listWrapper">
        <div onClick={this.toggle}>
          <span>{list}</span>
          <span>
            <i className={`fa fa-angle-${toggled ? 'up' : 'down'}`}/>
          </span>
        </div>
        {
          toggled && <TodosWrapper>
            <AddTodo listName={list} onAddTodo={createTodo} />
            <Filter selectedFilterType={filterType} filterList={this.filterList}/>
            <TodoList listName={list} items={filteredItems.length ? filteredItems : items} toggleComplete={toggleComplete} />
          </TodosWrapper>
        }
      </div>
    )
  }
}

export default ListWrapper;