import { Container } from 'unstated'

const defaultState = {
  todoLists: {
    list: [
      {
        id: 1,
        completed: false,
        text: 'Read README'
      },
      {
        id: 2,
        completed: false,
        text: 'Add one todo'
      },
      {
        id: 3,
        completed: false,
        text: 'Add filters'
      },
      {
        id: 4,
        completed: false,
        text: 'Add multiple lists'
      },
      {
        id: 5,
        completed: false,
        text: 'Optional: add tests'
      }
    ]
  }
};

class TodosContainer extends Container {
  constructor (props) {
    super(props);
    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState');
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state);
      window.localStorage.setItem('appState', state)
    }
  }

  getLists () {
    return this.state.todoLists
  }
  
  getListItems = (list, type) => {
    const {todoLists} = this.state;
    if (type === 'all') {
      return todoLists[list]
    }
    return todoLists[list].filter(item => type === 'completed' ? item.completed : !item.completed)
  };

  toggleComplete = async (id, listName) => {
    const item = this.state.todoLists[listName].find(i => i.id === id);
    const completed = !item.completed;

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.todoLists[listName].map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          completed
        }
      });
      return {
        ...state,
        todoLists: {
          ...state.todoLists,
          [listName]: list
        }
      }
    });

    this.syncStorage()
  };

  createTodo = async (text, listName = '', type) => {
    if (type === 'list') {
      await this.setState(state => {
        return {
          ...state,
          todoLists: {
            ...state.todoLists,
            [text]: []
          }
        }
      });
      return this.syncStorage();
    }
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.todoLists[listName].length + 1
      };

      const list = state.todoLists[listName].concat(item);
      return {
        ...state,
        todoLists: {
          ...state.todoLists,
          [listName]: list
        }
      }
    });

    this.syncStorage()
  };
}

export default TodosContainer
