import React, { useState , useEffect} from 'react';
import './TaskList.css';
import { FaEllipsisV } from 'react-icons/fa'; // Import the three-dot icon

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(null); // Track which task's dropdown is open

  const handleMenuClick = (taskId) => {
    setOpenMenu(openMenu === taskId ? null : taskId); // Toggle the dropdown
  };

  // Handle outside click to close the menu
  const handleClickOutside = (e) => {
    if (e.target.closest('.action-menu') === null) {
      setOpenMenu(null); // Close menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.user}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>{task.comments}</td>
            <td>
              <div className="action-menu" style={{ position: 'relative' }}>
                <button className="menu-button" onClick={() => handleMenuClick(task.id)}>
                  <FaEllipsisV /> {/* Three-dot vertical icon */}
                </button>
                {openMenu === task.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => onEdit(task)}>Edit</button>
                    <button onClick={() => onDelete(task)}>Delete</button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
