import React, { useState } from 'react';
import { createTodo as createTodoMutation } from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Auth from '@aws-amplify/auth';

const initialFormState = { name: '' }


function AddTodo({props, callback}) {

        const handleCreateNewTodo = () => {
          setIsAddingTodo(false)
          createTodo();
        }
        const [formData, setFormData] = useState(initialFormState);
        const [isAddingTodo, setIsAddingTodo] = useState(false);
        async function onChange(e) {
          // if (!e.target.files[0]) return
          // const file = e.target.files[0];
          // setFormData({ ...formData, image: file.name });
          // await Storage.put(file.name, file);
          // fetchTodos();
        }
        


        function updateForm(value){
          setFormData({ ...formData, 'description': value});
        }
        
        function handleNewTodoClick(){
          setIsAddingTodo(true)
        }
        
        async function createTodo() {
          if (!formData.description) return;

          let newTodoData = {
            description: formData.description,
            category: "_uncategorized"
          }          

          await API.graphql({ query: createTodoMutation, variables: { input: newTodoData }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
          setFormData(initialFormState);
          callback()
        }
        
    
        return (
            <div className={"add-todo"}>

              { isAddingTodo &&
                <input
                  className={"new-todo-input"}
                  autoFocus
                  onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                  placeholder="Add new todo"
                  value={formData.description || ''}
                  onBlur={handleCreateNewTodo}
                />
              }
              { !isAddingTodo &&
                <button className={'add-todo-button'} onClick={handleNewTodoClick} >+ Add new todo</button>
              }

          </div>

        )
} 

export default AddTodo;