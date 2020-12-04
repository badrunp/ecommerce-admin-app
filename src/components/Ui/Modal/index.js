import React from 'react'
import { Modal } from 'react-bootstrap'
import './style.css'

function ModalM(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton className="modal-header">
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-modal" onClick={props.onClick}>{props.icon && props.icon} Tambah</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalM
