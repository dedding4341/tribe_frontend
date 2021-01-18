import React, { useEffect } from "react";
import { Col, Row, Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteToast } from "../actionCreators";
import "./ToastNotif.css";

interface IProps {
  handleClose: Function,
  show: boolean | undefined,
  msg: string,
  title: string,
  time: string,
  toastId: number
}

function ToastNotif({ handleClose, show, msg, title, time, toastId }: IProps) {
  const dispatch = useDispatch();

  useEffect(function removeFromRedux() {
    setTimeout(() => {
      dispatch(deleteToast(toastId));
    }, 4000);
  }, []);

  return (
    <Toast className="ToastNotif-toast" onClose={() => handleClose()} show={show} delay={4000} autohide>
      <Toast.Header className="ToastNotif-header">
        <strong className="mr-auto">{title}</strong>
        <small>{time}</small>
      </Toast.Header>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  );
};

export default ToastNotif;