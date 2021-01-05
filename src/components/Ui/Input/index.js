import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.css";

function Input(props) {
  return (
    <>
      <Form>
        <Form.Group>
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <div className="box-input">
            {props.iconleft && props.iconleft}
            <Form.Control
              {...props}
              type={props.type}
              value={props.value}
              onKeyUp={props.onKeyUp}
              onChange={props.onChange}
              placeholder={props.placeholder}
            />
            {props.icon ? props.icon : null}
          </div>
        </Form.Group>
      </Form>
    </>
  );
}

export default Input;
