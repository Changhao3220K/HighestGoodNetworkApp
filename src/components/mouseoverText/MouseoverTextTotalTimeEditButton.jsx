import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from '../../utils/URL';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { createMouseoverText, updateMouseoverText } from '../../actions/mouseoverTextAction';


function MouseoverTextTotalTimeEditButton({
    createMouseoverText,
    updateMouseoverText,
    onUpdate,
    mouseoverTextId,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [newText, setNewText] = useState('');


    const handleUpdateText = () => {
        setModalOpen(true);
    };

    const handleSaveText = () => {
        const mouseoverTextFormat = {
            newMouseoverText: newText,
        };
        if (newText) {
            updateMouseoverText(mouseoverTextId, mouseoverTextFormat);
            toast.success('Mouseover Text updated!');
        } else {
            createMouseoverText(mouseoverTextFormat);
            toast.success('Mouseover Text created!');
        }
        setModalOpen(false);
        onUpdate(newText);
    };

    const handleCancelSave = () => {
        setModalOpen(false);
    };


    return (
        <div>
            <div>
                <i
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                    onClick={handleUpdateText}
                ></i>
                <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                    <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Edit Mouseover Text</ModalHeader>
                    <ModalBody>
                        <Label for="newText">New Text</Label>
                        <Input
                            type="text"
                            name="newText"
                            id="newText"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSaveText}>
                            Save
                        </Button>{' '}
                        <Button color="secondary" onClick={handleCancelSave}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}




const mapStateToProps = (state) => {
    return {
        mouseoverText: state?.mouseoverText?.[0]?.mouseoverText,
        mouseoverTextId: state?.mouseoverText?.[0]?._id,
    };
};

const mapDispatchToProps = dispatch => ({
    createMouseoverText: mouseoverText => dispatch(createMouseoverText(mouseoverText)),
    updateMouseoverText: (mouseoverTextId, mouseoverText) =>
        dispatch(updateMouseoverText(mouseoverTextId, mouseoverText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MouseoverTextTotalTimeEditButton);



