import { useEffect, useMemo, useState } from 'react';
import Board from './components/Board';
import NewTaskForm from './components/NewTaskForm';
import { createTask, deleteTask, getTasks, updateTask } from './api/tasks';
import './App.css';

const STATUS_ORDER = ['todo', 'in_progress', 'done'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const groupedTasks = useMemo(() => {
    return STATUS_ORDER.reduce((acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    }, {});
  }, [tasks]);

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialTasks = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load tasks.');
      } finally {
        setLoading(false);
      }
    };

    void fetchInitialTasks();
  }, []);

  const handleCreateTask = async ({ title, description }) => {
    setSubmitting(true);
    setError('');

    try {
      const newTask = await createTask({ title, description });
      setTasks((current) => [newTask, ...current]);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to create task.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTask = async (id, payload) => {
    const updatedTask = await updateTask(id, payload);
    setTasks((current) => current.map((task) => (task.id === id ? updatedTask : task)));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    const task = tasks.find((item) => String(item.id) === draggableId);
    if (!task) return;

    const nextStatus = destination.droppableId;

    setTasks((current) =>
      current.map((item) => (item.id === task.id ? { ...item, status: nextStatus } : item))
    );

    try {
      await handleUpdateTask(task.id, { status: nextStatus });
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to move task.');
      setTasks((current) =>
        current.map((item) => (item.id === task.id ? { ...item, status: source.droppableId } : item))
      );
    }
  };

  return (
    <div className="app-shell">
      <header className="app-hero">
        <div>
          <p className="eyebrow">TaskFlow</p>
          <h1>Kanban board for delivery teams</h1>
          <p className="subtitle">
            Manage tasks, drag them across columns, and keep a clean delivery flow.
          </p>
        </div>
      </header>

      <main className="app-main">
        <NewTaskForm onSubmit={handleCreateTask} loading={submitting} />

        {error ? <p className="alert alert-error">{error}</p> : null}

        <Board
          tasks={groupedTasks}
          loading={loading}
          onDragEnd={handleDragEnd}
          onDeleteTask={handleDeleteTask}
        />

        <div className="footer-actions">
          <button className="secondary-button" type="button" onClick={loadTasks} disabled={loading}>
            Refresh board
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
