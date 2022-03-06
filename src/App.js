import { Amplify, API, Storage } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import AddTodo from './AddTodoComponent';
Amplify.configure(awsExports);


export default function App() {
  return (
      
    <div className="App">
      <h1>Welcome!</h1>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <AddTodo />
            <h1>Hello {user.username}. How are you?</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      </div>
  );
}
