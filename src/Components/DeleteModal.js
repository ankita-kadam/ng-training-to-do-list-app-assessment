import React from 'react';

const DeleteModal = ({ task, onDelete, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Delete</h3>
        <p>Do you want to delete task: {task.user}?</p>
        <div className="modal-actions">
          <button onClick={onDelete}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
