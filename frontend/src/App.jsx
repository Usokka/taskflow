import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('/api/tasks');
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks. Is the backend running?');
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TaskFlow</h1>
      </header>
      <main>
        <h2>Tasks</h2>
        {error && <p className="error">{error}</p>}
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span>Status: {task.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found. Create one!</p>
        )}
      </main>
    </div>
  );
}

export default App;
