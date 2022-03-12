


import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ViewImage({imgSrc}) {        

        return (
            <div>
                <Modal.Body className={'image-modal-body'} closeButton>
                    <img className={'image-modal-image'} src={imgSrc}></img>
                </Modal.Body>
            </div>

        )
} 

export default ViewImage;