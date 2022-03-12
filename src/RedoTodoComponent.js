


import React from 'react';
import { updateTodo as updateTodoMutation } from './graphql/mutations';
import { API } from 'aws-amplify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function RedoTodo({todoId, updateSuccessCallback, cancelCallback}) {        

        function handleUpdateTodo(){
            updateTodo()
        }

        function handleCancel(){
          cancelCallback()
        }

        async function updateTodo(){
            let newTodoData = {
                id: todoId,
                completed: false
            }      
            await API.graphql({ query: updateTodoMutation, variables: { input: newTodoData }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
            updateSuccessCallback() //ostensibly close the modal, update todos
        }

    
        return (
            <div>
                <Modal.Header closeButton>
                <Modal.Title>Redo this todo?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Are you sure you want to redo this one?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdateTodo}>
                    Redo
                </Button>
                </Modal.Footer>

            </div>

        )
} 

export default RedoTodo;