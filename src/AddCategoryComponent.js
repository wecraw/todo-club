import React, { useState, useEffect } from 'react';
import { createCategory as createCategoryMutation } from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Auth from '@aws-amplify/auth';

const initialFormState = { name: '' }
const TODO_LIST_ID = "91334d86-fbd0-434d-a81e-cf0da28ee262" //this is the ID for the singular todoList used between me and Miriam
                                                            //this would obviously not work in a scaled app


function AddCategory(props) {

        const [show, setShow] = useState(false);
        const [disabled, setDisabled] = useState(true);
        const handleClose = () => setShow(false);

        const handleCreateNewCategory = () => {
          createCategory();
          setShow(false);
        }

        const handleShowNewCategoryModal = () => setShow(true);
        const [formData, setFormData] = useState(initialFormState);
        
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
        
        async function createCategory() {
          if (!formData.name) return;
          // if (formData.name === "_uncategorized"){  //can't make another category with this name since it's used to sort uncategorized todos
          //   console.log("plz don't do that")
          //   return
          // }

          let newCategoryData = {
            name: formData.name,
            todolistID: TODO_LIST_ID,
            type: "category"
          }          

          await API.graphql({ query: createCategoryMutation, variables: { input: newCategoryData }, authMode: 'AMAZON_COGNITO_USER_POOLS' });
          setFormData(initialFormState);
        }

    
        return (
            <div>
                
              {/* <input
                onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                placeholder="Todo list name"
                value={formData.name}
              /> */}
            <Fab className="new-cat-fab" color="inherit" onClick={handleShowNewCategoryModal} aria-label="add">
                <AddIcon />
            </Fab>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formNewCategoryName">
                  <Form.Label>Give your category a name</Form.Label>
                  <Form.Control onChange={e => updateForm(e.target.value)} name="newCategoryName" type="text" placeholder="Enter name" />
                </Form.Group>   
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCreateNewCategory} disabled={disabled}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>

          </div>

        )
} 

export default AddCategory;