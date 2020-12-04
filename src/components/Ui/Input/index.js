import React from 'react'
import { Form } from 'react-bootstrap'
import './style.css'

function Input(props) {

    return (
        <>
            <Form>
                <Form.Group>
                    {props.label && (<Form.Label>{props.label}</Form.Label>)}
                    <div className="box-input">
                        {props.iconLeft && props.iconLeft}
                        <Form.Control {...props} type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} className="input-all" />
                        {props.icon ? props.icon : null}
                    </div>
                </Form.Group>
            </Form>
        </>
    )
}

export default Input
