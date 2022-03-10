import { Amplify, API, Storage, Auth, Hub } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import AddTodoList from './AddTodoListComponent';
import AddCategory from './AddCategoryComponent';
import AddTodo from './AddTodoComponent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Fab from '@mui/material/Fab';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List'
import { listTodoLists, listTodos, listCategories } from './graphql/queries';
import { deleteTodo as deleteTodoMutation, deleteTodoList as deleteTodoListMutation } from './graphql/mutations';
import Zoom from '@mui/material/Zoom';

Amplify.configure(awsExports);


export default function App() {

  const [todoLists, setTodoLists] = useState([]);
  const [categories, setCategories] = useState([])
  const [userData, setUserData] = useState([]);
  const [showAllLists, setShowAllLists] = useState([false])
  const [categoryView, setCategoryView] = useState(false)
  const [todos, setTodos] = useState([])

    useEffect(() => {
    fetchTodoLists();
    fetchCategories();
    fetchTodos();
  }, []);
  
  async function fetchTodoLists() {
    const apiData = await API.graphql({ query: listTodoLists, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const todoListsFromAPI = apiData.data.listTodoLists.items;
    await Promise.all(todoListsFromAPI.map(async todoList => {
      return todoList;
    }))
    setTodoLists(apiData.data.listTodoLists.items);
    setShowAllLists(apiData.data.listTodoLists.items.length > 1)
  }


  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const todosFromAPI = apiData.data.listTodos.items;
    await Promise.all(todosFromAPI.map(async todo => {
      return todo;
    }))
    setTodos(apiData.data.listTodos.items);
    // setShowAllLists(apiData.data.listTodoLists.items.length > 1)
  }

  async function fetchCategories() {
    const apiData = await API.graphql({ query: listCategories, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const categoriesFromAPI = apiData.data.listCategories.items;
    await Promise.all(categoriesFromAPI.map(async category => {
      return category;
    }))
    setCategories(apiData.data.listCategories.items);
    // setShowAllLists(apiData.data.listTodoLists.items.length > 1)
  }

  //this should only be visible if there are two or more todolists i.e. one needs to get cleared
  async function deleteTodoList({ id }) {
    const newTodoListsArray = todoLists.filter(todoList => todoList.id !== id);
    setTodoLists(newTodoListsArray);
    await API.graphql({ query: deleteTodoListMutation, variables: { input: { id } }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
  }

  async function deleteTodo({ id }) {
    const newTodosArray = todos.filter(todo => todo.id !== id);
    setTodos(newTodosArray);
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
  }
  
  function toggleCategoryView(){
    setCategoryView(!categoryView)
  }

  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
          fetchTodoLists()
          break;
    }
  });

  function testCallback(){

    fetchTodos()
  }
  


  return (
      
    <div className="App">
      <Container >
        <div className={'header-row'}>
          <h1>Todo</h1>
          <div className="img-row">
            <img className={'heart-img-m'} src={"/assets/m_heart.png"}></img>
            <img className={'heart-img-w'} src={"/assets/w_heart.png"}></img>
          </div>
        </div>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <Button onClick={fetchTodos}>refresh todos</Button>
            { !categoryView &&
              
              todos.map(todo => (
                  <div key={todo.description}>
                  {todo.description}
                  <Button onClick={() => deleteTodo(todo)}></Button>

                </div>
              ))
            }
            { !categoryView && 
                <AddTodo callback={testCallback} />
            }

                <Fab className="view-toggle-fab" onClick={toggleCategoryView} color="primary" aria-label="add">
                  { !categoryView &&
                  <Zoom timeout={200} in={!categoryView}>
                    <GridViewIcon />
                  </Zoom>
                  }
                  { categoryView &&

                  <Zoom timeout={200} in={categoryView}>
                    <ListIcon />

                  </Zoom>
                  }
                </Fab>
                <div className={categoryView ? "fab-visible" : "fab-hidden"}>
                  
                  <AddCategory  />
                  
                </div>
            

            {/* <AddTodoList /> removing this bc shouldn't be a need to create multiple lists */}

            {/* <Button style={{marginTop: '30px'}} onClick={fetchTodoLists}>Refresh todo lists</Button> */}

            <div style={{marginBottom: 30}}>
            { showAllLists &&
              
              todoLists.map(todoList => (
                  <div key={todoList.name}>
                  {todoList.name}
                  <Button onClick={() => deleteTodoList(todoList)}></Button>

                </div>
              ))
            }
            { !showAllLists && categoryView &&
                <div>
                  { 
                    categories.map(category => (
                        <div key={category.name}>
                        {category.name}

                      </div>
                    ))
                  }
                </div>
                  
            }
            </div>

            <br></br>
            {/* <h1>Hello {currentUserEmail}. How are you?</h1>
            <button onClick={signOut}>Sign out</button>
            not needed with 2 users really
            */}
          </main>
        )}
      </Authenticator>
      </Container>
      </div>
  );
}
