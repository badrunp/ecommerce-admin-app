import React from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './style.css'

function ModalM(props) {

    const {darkMode} = useSelector(state => state.darkMode)

    return (
        <Modal show={props.show} onHide={props.onHide} size={props.size}>
            <Modal.Header closeButton className="modal-header" style={{background: props.bgColor}} className={darkMode ? "bg-content-dark-mode border-color-dark-mode" : ""}>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className={darkMode ? "bg-content-dark-mode" : "bg-white"}>

                {props.children}
     
             
            </Modal.Body>
            <Modal.Footer style={{border: 'none', paddingTop: '0'}} className={darkMode ? "bg-content-dark-mode" : "bg-white"}>
               {props.nonButton ? null : ( <button className="btn btn-modal" onClick={props.onClick} style={{background: props.bgColor}}>{props.icon && props.icon} {props.textButton}</button>)}
            </Modal.Footer>
        </Modal>
    )
}

export default ModalM
