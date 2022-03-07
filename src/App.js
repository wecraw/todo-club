import { Amplify, API, Storage } from 'aws-amplify';
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
    const apiData = await API.graphql({ query: listTodoLists });
    const todoListsFromAPI = apiData.data.listTodoLists.items;
    await Promise.all(todoListsFromAPI.map(async todoList => {
      return todoList;
    }))
    setTodoLists(apiData.data.listTodoLists.items);
  }
        

  async function refreshTodoLists(){

  }

  return (
      
    <div className="App">
      <h1>Welcome!</h1>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <AddTodo />
            <Button style={{marginTop: '30px'}} onClick={refreshTodoLists}>Refresh todo lists</Button>

            <div style={{marginBottom: 30}}>
            {
              todoLists.map(todoList => (
                <div key={todoList.title}>
                  {todoList.id}
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
