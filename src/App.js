import { Amplify, API, Storage, Auth, Hub } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import AddTodoList from './AddTodoListComponent';
import Profile from './ProfileComponent';
import Button from 'react-bootstrap/Button';
import { listTodoLists, listUserData, getTodoList } from './graphql/queries';
import { createUserData as createUserDataMutation, deleteTodoList as deleteTodoListMutation } from './graphql/mutations';

Amplify.configure(awsExports);


export default function App() {

  const [todoLists, setTodoLists] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showAllLists, setShowAllLists] = useState([false])
  const [currentUserEmail, setCurrentUserEmail] = useState("");

    useEffect(() => {
    fetchTodoLists();
    getEmail()
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

  //this should only be visible if there are two or more todolists i.e. one needs to get cleared
  async function deleteTodoList({ id }) {
    const newTodoListsArray = todoLists.filter(todoList => todoList.id !== id);
    setTodoLists(newTodoListsArray);
    await API.graphql({ query: deleteTodoListMutation, variables: { input: { id } }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
  }

  async function getEmail(){
    const email = await Auth.currentAuthenticatedUser().then((user) => {
      let email = user.attributes.email;
      return email
    })
    setCurrentUserEmail(email)
  }

  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
          getEmail()
          fetchTodoLists()
          break;
      case 'signUp':
          // onFirstSignUp()
          break;
      case 'signOut':
        try {
          setTodoLists([])
        } catch (e) {
          return //catch error refreshing (i.e. clearing) list of to-dos on sign out
        }
        break;
      case 'signIn_failure':
          console.log('user sign in failed');
          break;
    }
  });

  return (
      
    <div className="App">
      <h1>Welcome!</h1>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            {/* <AddTodoList /> removing this bc shouldn't be a need to create multiple lists */}
            <Button style={{marginTop: '30px'}} onClick={fetchTodoLists}>Refresh todo lists</Button>

            <div style={{marginBottom: 30}}>
            { showAllLists &&
              
              todoLists.map(todoList => (
                <div key={todoList.name}>
                  {todoList.name}
                  <Button onClick={() => deleteTodoList(todoList)}></Button>

                </div>
              ))
            }
            { !showAllLists &&
                <div>
                  you've only got one list! nice
                  </div>
            }
            </div>

            <br></br>
            <h1>Hello {currentUserEmail}. How are you?</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      </div>
  );
}
