import { Amplify, API, Storage, Auth, Hub } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import AddCategory from './AddCategoryComponent';
import CompleteTodo from './CompleteTodoComponent';
import RedoTodo from './RedoTodoComponent';
import AddTodo from './AddTodoComponent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Fab from '@mui/material/Fab';
import { XLg, Image } from 'react-bootstrap-icons'
import CloseIcon from '@mui/icons-material/Close'
import ViewImage from './ViewImageComponent';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List'
import { listTodoLists, todosByDate, listCategories } from './graphql/queries';
import { deleteCategory as deleteCategoryMutation, deleteTodo as deleteTodoMutation, deleteTodoList as deleteTodoListMutation } from './graphql/mutations';
import Zoom from '@mui/material/Zoom';

Amplify.configure(awsExports);

export default function App() {

  const [todoLists, setTodoLists] = useState([]);
  const [categories, setCategories] = useState([])
  const [showAllLists, setShowAllLists] = useState([false])
  const [categoryView, setCategoryView] = useState(false)
  const [todos, setTodos] = useState([])
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showRedoModal, setShowRedoModal] = useState(false);
  const [clickedTodo, setClickedTodo] = useState({})
  const [showImageModal, setShowImageModal] = useState(false);
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    try{
      fetchTodoLists();
      fetchCategories();
      fetchTodos();
    }
    catch(e) {
      // console.log(e)
    }

  }, [isSignedIn]);


  const handleCloseCompletionModal = () => setShowCompletionModal(false);
  const handleCloseRedoModal = () => setShowRedoModal(false);
  const handleCloseImageModal = () => setShowImageModal(false);

  function handleShowImageModal(todo){
    setClickedTodo(todo);
    console.log(todo)
    setShowImageModal(true);
  }

  function handleShowCompletionModal(todo){
    setClickedTodo(todo);
    setShowCompletionModal(true);
  }

  function handleShowRedoModal(todo){
    setClickedTodo(todo);
    setShowRedoModal(true);
  }

  const handleUpdateAndCloseRedoModal = () => {
    setShowRedoModal(false)
    fetchTodos()
  }
  
  const handleUpdateAndCloseCompletionModal = () => {
    setShowCompletionModal(false)
    fetchTodos()
  }

  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
          setSignedIn(true);
          break;
    }
  });
  
  function toggleCategoryView(){
    setCategoryView(!categoryView)
  }


  ////////////////////////////////////////////CRUD////////////////////////////////////////////////////
  
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
    const apiData = await API.graphql({ query: todosByDate, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const todosFromAPI = apiData.data.todosByDate.items;
    await Promise.all(todosFromAPI.map(async todo => {
      if (todo.picture){
        const image = await Storage.get(todo.picture)
        todo.picture = image
      }
      return todo;
    }))
    setTodos(apiData.data.todosByDate.items);
    console.log(todos)
  }

  async function fetchCategories() {
    const apiData = await API.graphql({ query: listCategories, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const categoriesFromAPI = apiData.data.listCategories.items;
    await Promise.all(categoriesFromAPI.map(async category => {
      return category;
    }))
    setCategories(apiData.data.listCategories.items);
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

  async function deleteCategory({ id }) {
    const newCategoriesArray = categories.filter(category => category.id !== id);
    setCategories(newCategoriesArray);
    await API.graphql({ query: deleteCategoryMutation, variables: { input: { id } }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
  }



  /////////////////////////////////////////////////END CRUD////////////////////////////////////////////////////////////////


  return (
      
    <div className="App">


      <Container >
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <div key={'header-row-key'} className={'header-row'}>
              <h1>Todo</h1>
              <div className="img-row">
                <img key={'mir-row-key'} alt={'Mirs heart'} className={'heart-img-m'} src={"/assets/m_heart.png"}></img>
                <img key={'will-row-key'} alt={'Wills heart'} className={'heart-img-w'} src={"/assets/w_heart.png"}></img>
              </div>
            </div>
            <div className={"todo-column"}>

              { !categoryView &&
                
                todos.filter(todo => todo.completed === false).map(todo => (
                    <div className={"todo-column-item"} id={todo.id} key={todo.id}>
                      
                    <Form.Check  key={todo.id} id={todo.description} type={"checkbox"} label={todo.description} className={"checkbox"} onClick={() => handleShowCompletionModal(todo)}></Form.Check>
                    <div className={'close-icon'}>
                      <CloseIcon onClick={() => deleteTodo(todo)} />
                    </div>
                  </div>
                ))
              }
                <Modal centered show={showCompletionModal} onHide={handleCloseCompletionModal}>
                      <CompleteTodo todoId={clickedTodo.id} cancelCallback={handleCloseCompletionModal} updateSuccessCallback={handleUpdateAndCloseCompletionModal} />
                </Modal>
                <Modal centered show={showRedoModal} onHide={handleCloseRedoModal}>
                      <RedoTodo todoId={clickedTodo.id} cancelCallback={handleCloseRedoModal} updateSuccessCallback={handleUpdateAndCloseRedoModal} />
                </Modal>
            </div>
            { !categoryView && 
                <AddTodo callback={fetchTodos} />
            }
            {
              !categoryView && 
              <h2>Completed</h2>

            }
            <div className={"todo-column"}>

              { !categoryView && 
                  
                  todos.filter(todo => todo.completed === true).map(todo => (
                      <div className={"todo-column-item"} id={todo.id} key={todo.id}>
                        
                      <Form.Check  key={todo.id} id={todo.description} type={"checkbox"} label={todo.description} defaultChecked={true} className={"checkbox"} onClick={() => handleShowRedoModal(todo)}></Form.Check>
                      { todo.picture && 
                        <div>
                          <Image className={'image-icon'} onClick={() => handleShowImageModal(todo)} />
                        </div>
                      }
                      {/* <div className={'close-icon'}>
                        <CloseIcon onClick={() => deleteTodo(todo)} />
                      </div> */}
                    </div>
                  ))
                }
            </div>
            <Modal centered show={showImageModal} onHide={handleCloseImageModal}>
              <ViewImage imgSrc={clickedTodo.picture} />
            </Modal>
            

{/* 
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
                  
                </div> */}
            

            {/* <AddTodoList /> removing this bc shouldn't be a need to create multiple lists */}

            {/* <Button style={{marginTop: '30px'}} onClick={fetchTodoLists}>Refresh todo lists</Button> */}

            <div style={{marginBottom: 30}}>
            { showAllLists &&
              
              todoLists.map(todoList => (
                  <div key={todoList.name}>
                  {todoList.name}
                  <XLg onClick={() => deleteTodoList(todoList)} />

                </div>
              ))
            }
            { !showAllLists && categoryView &&
                <div>
                  { 
                    categories.map(category => (
                        <div key={category.name}>
                        {category.name}
                        <Button onClick={() => deleteCategory(category)}></Button>

                      </div>
                    ))
                  }
                </div>
                  
            }
            </div>



          </main>
        )}
      </Authenticator>
      </Container>
      </div>
  );
}
