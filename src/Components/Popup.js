import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Popup.css'





export default function Popup(props) {
  const { show, handleClose, title, children, closeButtonLabel, primaryButtonLabel, image  } = props;






  
  return (
    <div>
     <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
      
        <Modal.Title>
        {image && <img src={image} alt="Popup Image" />}
          <h1>{title}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
        <p>{children}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {closeButtonLabel}
        </Button>
        <Button variant="primary"  onClick={handleClose}>{primaryButtonLabel} </Button>
      </Modal.Footer>
    </Modal>
 

  

</div>
);
}

