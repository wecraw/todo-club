import React, { useState } from 'react';
import { createTodo as createTodoMutation } from './graphql/mutations';
import { API } from 'aws-amplify';

const initialFormState = { name: '' }


function AddTodo({props, callback}) {

        const handleCreateNewTodo = () => {
          setIsAddingTodo(false)
          createTodo();
        }
        const [formData, setFormData] = useState(initialFormState);
        const [isAddingTodo, setIsAddingTodo] = useState(false);

        function blurSelf(e){
          if(e.code === "Enter"){
            console.log("enter pressed")
            e.target.blur()
          }
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
            category: "_uncategorized",
            type: "todo",
            completed: false
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
                  onKeyUp={e => blurSelf(e)}
                  autoFocus
                  onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                  placeholder=""
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