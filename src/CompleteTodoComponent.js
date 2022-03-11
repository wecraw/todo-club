import React, { useState, useEffect } from 'react';
import { updateTodo, updateTodo as updateTodoMutation } from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Auth from '@aws-amplify/auth';

const initialFormState = { description: '' }
const TODO_LIST_ID = "91334d86-fbd0-434d-a81e-cf0da28ee262" //this is the ID for the singular todoList used between me and Miriam
                                                            //this would obviously not work in a scaled app


function CompleteTodo({todoId, todoName, updateSuccessCallback}) {

        const [disabled, setDisabled] = useState(true);

        const [formData, setFormData] = useState(initialFormState);
        
        function updateForm(value){
          setButtonDisabled(value);
          setFormData({ ...formData, 'description': value});
        }

        function handleUpdateTodo(){
            updateTodo()
            console.log(todoId)
            console.log(todoName)
        }

        async function updateTodo(){
            if (!formData.description) return;
            // if (formData.name === "_uncategorized"){  //can't make another category with this name since it's used to sort uncategorized todos
            //   console.log("plz don't do that")
            //   return
            // }
  
            let newTodoData = {
              description: formData.description,
              id: todoId,
            }          
  
            await API.graphql({ query: updateTodoMutation, variables: { input: newTodoData }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
            setFormData(initialFormState);
            updateSuccessCallback() //ostensibly close the modal, update todos

        }

        function setButtonDisabled(e){
          if (e === ""){
            setDisabled(true);
          } else {
            setDisabled(false);
          }
        }
    
        return (
            <div>



            <Modal.Header closeButton>
            <Modal.Title>We did it!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formUpdateTodo">
                  <Form.Label>Add an image:</Form.Label>
                  <Form.Control onChange={e => updateForm(e.target.value)} name="newTodoDescription" type="text" placeholder={todoName} />
                </Form.Group>   
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleUpdateTodo} disabled={disabled}>
                Create
              </Button>
            </Modal.Footer>

          </div>

        )
} 

export default CompleteTodo;