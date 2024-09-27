// import React, { useState } from 'react';
// import TaskList from './Components/TaskList';
// import TaskForm from './Components/TaskForm';
// import DeleteModal from './Components/DeleteModal';
// import './App.css';

// const App = () => {
//   const [tasks, setTasks] = useState([
//     { id: 1, user: 'User 1', status: 'Completed', dueDate: '2024-10-16', priority: 'Low', comments: 'This task is good' },
//     { id: 2, user: 'User 2', status: 'In Progress', dueDate: '2024-09-12', priority: 'High', comments: 'This task is good' },
//     { id: 3, user: 'User 3', status: 'Not Started', dueDate: '2024-08-07', priority: 'Low', comments: 'This task is good' },
//     { id: 4, user: 'User 4', status: 'In Progress', dueDate: '2024-05-13', priority: 'Normal', comments: 'This task is good' },
//     { id: 5, user: 'User 5', status: 'Completed', dueDate: '2024-07-16', priority: 'Low', comments: 'This task is good' },
 
//   ]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleAddTask = () => {
//     setSelectedTask(null);
//     setIsEditing(true);
//   };

//   const handleEditTask = (task) => {
//     setSelectedTask(task);
//     setIsEditing(true);
//   };

//   const handleDeleteTask = (task) => {
//     setSelectedTask(task);
//     setIsDeleting(true);
//   };

//   const saveTask = (task) => {
//     if (task.id) {
//       setTasks(tasks.map(t => (t.id === task.id ? task : t)));
//     } else {
//       task.id = tasks.length + 1;
//       setTasks([...tasks, task]);
//     }
//     setIsEditing(false);
//   };

//   const deleteTask = () => {
//     setTasks(tasks.filter(task => task.id !== selectedTask.id));
//     setIsDeleting(false);
//   };

//   return (
//     <div className="App">
//       <h1>Task Manager</h1>
//       <div className="task-header">
//         <button className="new-task" onClick={handleAddTask}>New Task</button>
//       </div>
//       <TaskList 
//         tasks={tasks} 
//         onEdit={handleEditTask} 
//         onDelete={handleDeleteTask} 
//       />
//       {isEditing && (
//         <TaskForm 
//           task={selectedTask} 
//           onSave={saveTask} 
//           onCancel={() => setIsEditing(false)} 
//         />
//       )}
//       {isDeleting && (
//         <DeleteModal 
//           task={selectedTask} 
//           onDelete={deleteTask} 
//           onCancel={() => setIsDeleting(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';
import DeleteModal from './Components/DeleteModal';
import Pagination from './Components/Pagination'; // Import Pagination component
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, user: 'User 1', status: 'Completed', dueDate: '2024-10-16', priority: 'Low', comments: 'This task is good' },
    { id: 2, user: 'User 2', status: 'In Progress', dueDate: '2024-09-12', priority: 'High', comments: 'This task is good' },
    { id: 3, user: 'User 3', status: 'Not Started', dueDate: '2024-08-07', priority: 'Low', comments: 'This task is good' },
    { id: 4, user: 'User 4', status: 'In Progress', dueDate: '2024-05-13', priority: 'Normal', comments: 'This task is good' },
    { id: 5, user: 'User 5', status: 'Completed', dueDate: '2024-07-16', priority: 'Low', comments: 'This task is good' },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10; // Number of tasks to display per page


  // Search functionality
  const filteredTasks = tasks.filter(task => 
    task.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsEditing(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setIsDeleting(true);
  };

  const saveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      task.id = tasks.length + 1;
      setTasks([...tasks, task]);
    }
    setIsEditing(false);
  };

  const deleteTask = () => {
    setTasks(tasks.filter(task => task.id !== selectedTask.id));
    setIsDeleting(false);
  };

  // Changing pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="App">
      <h1><b>Tasks</b></h1>

      {/* Search Bar */}
      <div className="task-header">
        <input 
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="new-task" onClick={handleAddTask}>New Task</button>
       </div>

      <TaskList 
        tasks={currentTasks} // Pass the paginated and filtered tasks
        onEdit={handleEditTask} 
        onDelete={handleDeleteTask} 
      />
        {/* Pagination */}
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={filteredTasks.length}
        currentPage={currentPage}
        paginate={paginate}
      />


      {isEditing && (
        <TaskForm 
          task={selectedTask} 
          onSave={saveTask} 
          onCancel={() => setIsEditing(false)} 
        />
      )}
      {isDeleting && (
        <DeleteModal 
          task={selectedTask} 
          onDelete={deleteTask} 
          onCancel={() => setIsDeleting(false)} 
        />
      )}
    </div>
  );
};

export default App;
