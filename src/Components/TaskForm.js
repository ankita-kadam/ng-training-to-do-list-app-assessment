import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    user: task ? task.user : 'User 1',
    status: task ? task.status : 'Not Started',
    dueDate: task ? task.dueDate : '',
    priority: task ? task.priority : 'Normal',
    comments: task ? task.comments : ''
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: task ? task.id : null });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th colSpan="2">
                <h3>{task ? 'Edit Task' : 'New Task'}</h3>
              </th>
            </tr>
          </thead>
          <tbody>
       
            <tr>
              <td>
                <label>
                  Assigned To :
                  <select name="user" value={formData.user} onChange={handleChange}>
                    <option>User 1</option>
                    <option>User 2</option>
                    <option>User 3</option>
                    <option>User 4</option>
                    <option>User 5</option>
                    <option>User 6</option>
                    <option>User 7</option>
                    <option>User 8</option>
                    <option>User 9</option>
                    <option>User 10</option>
                  </select>
                </label>
              </td>
              <td>
                <label>
                  Status :
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </label>
              </td>
            </tr>

            <tr>
              <td>
                <label>
                  Due Date :
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </label>
              </td>
              <td>
                <label>
                  Priority :
                  <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </label>
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                {/* Ensure Description label is above the textarea */}
                <div>
                  <label htmlFor="comments">Description :</label>
                </div>
                <div>
                  <textarea
                    id="comments"
                    rows={5}
                    cols={50}
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                  />
                </div>
              </td>
            </tr>

          </tbody>
        </table>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;



