import React from 'react'
import { Modal, Button} from 'react-bootstrap';

function DuplicateTradeModal(props: any) {


    return(
        <Modal
        {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4>Please cancel your current pending trade before making another trade.</h4>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DuplicateTradeModal