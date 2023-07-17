import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import './style.css';
import './reviewButton.css';
import { boxStyle } from 'styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ReviewButton = ({
  user,
  myUserId,
  myRole,
  task,
  updateTask
}) => {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  
  const reviewStatus = function() {
    let status = "Unsubmitted";
    for(let resource of task.resources){
      if (resource.userID === user.personId) {
        status = resource.reviewStatus ? resource.reviewStatus : "Unsubmitted"
        break;
      }
    }
    return status;
  }();

  const updReviewStat = (newStatus) => {
    const resources = [...task.resources];
    const newResources = resources?.map(resource => {
      let newResource = { ...resource };
      if (resource.userID === user.personId) {
        newResource = newStatus === "Reviewed"
        ? {
          ...resource,
          completedTask: true,
          reviewStatus: newStatus,
        } : {
          ...resource,
          reviewStatus: newStatus,
        };
      }
      return newResource;
    });
    const updatedTask = { ...task, resources: newResources };
    updateTask(task._id, updatedTask);
    setModal(false);
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Change Review Status
        </ModalHeader>
        <ModalBody>
          {reviewStatus == "Unsubmitted" 
            ? `Are you sure you want to submit for review?`
            : `Are you sure you have completed the review?`}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              reviewStatus == "Unsubmitted"
              ? updReviewStat("Submitted")
              : updReviewStat("Reviewed");
            }}
            color="primary"
            className="float-left"
            style={boxStyle}
          >
            {reviewStatus == "Unsubmitted"
              ? `Submit`
              : `Complete`}
          </Button>
          <Button
            onClick={toggleModal}
            style={boxStyle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {(user.personId == myUserId && reviewStatus == "Unsubmitted") ? (
          <Button className='reviewBtn' color='primary' onClick={toggleModal}>
              Submit for Review
            </Button>
        ) : ((myRole == "Owner" ||myRole == "Administrator" || myRole == "Mentor" || myRole == "Manager") && reviewStatus == "Submitted") ? (
          <UncontrolledDropdown>
            <DropdownToggle className="btn--dark-sea-green reviewBtn" caret>
              Ready for Review
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem onClick={toggleModal}>
              <FontAwesomeIcon
                className="team-member-tasks-done"
                icon={faCheck}
              /> as complete and remove task
            </DropdownItem>
            <DropdownItem onClick={() => {updReviewStat("Unsubmitted");}}>
              More work needed, reset this button
            </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (user.personId == myUserId && reviewStatus == "Submitted")?(
          <Button className='reviewBtn' color='success' onClick={() => {updReviewStat("Unsubmitted");}}>
            More work needed, reset this button
          </Button>
        ) : (reviewStatus == "Submitted") ? (
          <Button className='reviewBtn' color='success' disabled>
            Ready for Review
          </Button>
        ) : (<></>
        )}
    </>
  );
};

export default ReviewButton;
