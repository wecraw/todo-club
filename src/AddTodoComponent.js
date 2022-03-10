import React, { useState, useEffect } from 'react';
import { createTodo as createTodoMutation } from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Auth from '@aws-amplify/auth';

const initialFormState = { name: '' }


function AddTodo(props) {

        const handleCreateNewTodo = () => {
          createTodo();
          setShow(false);
        }

        const handleShowNewListModal = () => setShow(true);
        const [formData, setFormData] = useState(initialFormState);
        
        // async function onChange(e) {
        //   if (!e.target.files[0]) return
        //   const file = e.target.files[0];
        //   setFormData({ ...formData, image: file.name });
        //   await Storage.put(file.name, file);
        //   // fetchTodos();
        // }

        function updateForm(value){
          setButtonDisabled(value);
          setFormData({ ...formData, 'description': value});
        }
        
        async function createTodo() {
          if (!formData.description) return;

          let newTodoData = {
            description: formData.description,
            category: "_uncategorized"
          }          

          await API.graphql({ query: createTodoMutation, variables: { input: newTodoData }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
          setFormData(initialFormState);
        }
        
    
        return (
            <div>
              <input
                onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                placeholder="Add a todo"
                value={formData.description}
              />
            <Button onClick={handleShowNewListModal}>Create new todo club</Button>

          </div>

        )
} 

export default AddTodoList;