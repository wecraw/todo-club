import React, { useState } from 'react';
import { updateTodo as updateTodoMutation } from './graphql/mutations';
import { Amplify, API, Storage } from 'aws-amplify';
import Modal from 'react-bootstrap/Modal';
import awsExports from './aws-exports';
import Button from 'react-bootstrap/Button';
import { MDBFile } from 'mdb-react-ui-kit';
const initialFormState = { image: '' }

Amplify.configure(awsExports);


function CompleteTodo({todoId, updateSuccessCallback, cancelCallback}) {

        const [formData, setFormData] = useState(initialFormState);

        function handleUpdateTodo(){
            updateTodo()
        }

        function handleCancel(){
          cancelCallback()
        }

        async function updateTodo(){
          let newTodoData;
            if (!formData.image){
              newTodoData = {
                picture: formData.image,
                id: todoId,
                completed: true
              }      
            } else {
              newTodoData = {
                picture: formData.image,
                id: todoId,
                completed: true
              }      
            }
            await API.graphql({ query: updateTodoMutation, variables: { input: newTodoData }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
            setFormData(initialFormState);
            updateSuccessCallback() //ostensibly close the modal, update todos

        }

        async function onChange(e) {
          if (!e.target.files[0]) return
          const file = e.target.files[0];
          setFormData({ ...formData, image: file.name });
          await Storage.put(file.name, file);
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