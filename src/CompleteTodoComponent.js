import React, { useState, useEffect } from 'react';
import { updateTodo as updateTodoMutation } from './graphql/mutations';
import { Amplify, API, Storage } from 'aws-amplify';
import Modal from 'react-bootstrap/Modal';
import awsExports from './aws-exports';
import Button from 'react-bootstrap/Button';
import { MDBFile } from 'mdb-react-ui-kit';
const initialFormState = { image: '' }
const TODO_LIST_ID = "91334d86-fbd0-434d-a81e-cf0da28ee262" //this is the ID for the singular todoList used between me and Miriam
                                                            //this would obviously not work in a scaled app
Amplify.configure(awsExports);


function CompleteTodo({todoId, todoName, setCompleted, updateSuccessCallback, cancelCallback}) {

        const [disabled, setDisabled] = useState(true);

        const [formData, setFormData] = useState(initialFormState);
        
        function updateForm(value){
          setButtonDisabled(value);
          setFormData({ ...formData, 'image': value});
        }

        function handleUpdateTodo(){
            updateTodo()
        }

        function handleCancel(){
          cancelCallback()
        }

        async function updateTodo(){
            if (!formData.image) return;

            let newTodoData = {
              picture: formData.image,
              id: todoId,
              completed: setCompleted
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

        async function onChange(e) {
          if (!e.target.files[0]) return
          const file = e.target.files[0];
          setFormData({ ...formData, image: file.name });
          await Storage.put(file.name, file);
          updateTodo()
        }

        function test(){
          console.log("hey")
        }
    
        return (
            <div>



            <Modal.Header closeButton>
            <Modal.Title>We did it!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='file-container'>
               <MDBFile onChange={onChange} label='Add a picture!' id='customFile' />
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdateTodo}>
                Complete
              </Button>
            </Modal.Footer>

          </div>

        )
} 

export default CompleteTodo;