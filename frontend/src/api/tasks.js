import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

export const getTasks = async () => {
  const { data } = await api.get('/api/tasks');
  return data;
};

export const createTask = async ({ title, description, status = 'todo' }) => {
  const { data } = await api.post('/api/tasks', { title, description, status });
  return data;
};

export const updateTask = async (id, payload) => {
  const { data } = await api.patch(`/api/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/api/tasks/${id}`);
  return data;
};
