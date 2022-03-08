import { Amplify, API, Storage, Auth, Hub } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import AddTodo from './AddTodoComponent';
import Button from 'react-bootstrap/Button';
import { listTodoLists } from './graphql/queries';

Amplify.configure(awsExports);


export default function App() {

  const [todoLists, setTodoLists] = useState([]);

    useEffect(() => {
    fetchTodoLists();
  }, []);
  
  async function fetchTodoLists() {
    const apiData = await API.graphql({ query: listTodoLists, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const todoListsFromAPI = apiData.data.listTodoLists.items;
    console.log("hoe")

    await Promise.all(todoListsFromAPI.map(async todoList => {
      return todoList;
    }))
    console.log("hoe")
    setTodoLists(apiData.data.listTodoLists.items);
  }

  // async function signOut(){
  //   Auth.signOut();
  //   try {
  //     setTodoLists([])
  //   } catch (e) {
  //     return //catch error refreshing (i.e. clearing) list of to-dos on sign out
  //   }
  // }

  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
        fetchTodoLists()
        break;
      case 'signUp':
          console.log('user signed up');
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
      case 'configured':
          console.log('the Auth module is configured');
    }
  });

  return (
      
    <div className="App">
      <h1>Welcome!</h1>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <AddTodo />
            <Button style={{marginTop: '30px'}} onClick={fetchTodoLists}>Refresh todo lists</Button>

            <div style={{marginBottom: 30}}>
            {
              todoLists.map(todoList => (
                
                <div key={todoList.name}>
                  {todoList.name}
                </div>
              ))
            }
            </div>

            <br></br>
            <h1>Hello {user.username}. How are you?</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      </div>
  );
}
