import React, { useState, useEffect } from 'react';
import { createTodoList as createTodoListMutation } from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Auth from '@aws-amplify/auth';

const initialFormState = { name: '' }


function Profile(props) {

        const [show, setShow] = useState(false);
        const [disabled, setDisabled] = useState(true);
        const handleClose = () => setShow(false);

        const handleCreateNewList = () => {
          createTodoList();
          setShow(false);
        }

        const handleShowProfileModal = () => setShow(true);
        const [formData, setFormData] = useState(initialFormState);
        
        async function onChange(e) {
          if (!e.target.files[0]) return
          const file = e.target.files[0];
          setFormData({ ...formData, image: file.name });
          await Storage.put(file.name, file);
          // fetchTodos();
        }

        function updateForm(value){
          setButtonDisabled(value);
          setFormData({ ...formData, 'name': value});
        }

        function setButtonDisabled(e){
          if (e === ""){
            setDisabled(true);
          } else {
            setDisabled(false);
          }
        }
        
        async function createTodoList() {
          if (!formData.name) return;
          const owner = await Auth.currentAuthenticatedUser().then((user) => {
            let owner = user.attributes.name;
            console.log(owner)
            return owner
          })

          let newListData = {
            name: formData.name,
            // owner: owner,
            // sharedWith: [owner]
          }          

          await API.graphql({ query: createTodoListMutation, variables: { input: newListData }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
          setFormData(initialFormState);
        }
        
        // async function deleteTodo({ id }) {
        //   const newTodosArray = todos.filter(todo => todo.id !== id);
        //   setTodos(newTodosArray);
        //   await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }});
        // }
    
        return (
            <div>
              {/* <input
                onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                placeholder="Todo list name"
                value={formData.name}
              /> */}
            <Button onClick={handleShowProfileModal}>{props.email}</Button>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new Todo Club</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formNewListName">
                  <Form.Label>Give your club a name</Form.Label>
                  <Form.Control onChange={e => updateForm(e.target.value)} name="newListName" type="text" placeholder="Enter name" />
                </Form.Group>   
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCreateNewList} disabled={disabled}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>

          </div>

        )
} 

export default Profile;