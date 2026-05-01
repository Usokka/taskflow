import { useState } from 'react';

const initialForm = {
  title: '',
  description: '',
};

const NewTaskForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState(initialForm);
  const [localError, setLocalError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setLocalError('Title is required.');
      return;
    }

    setLocalError('');

    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
      });
      setForm(initialForm);
    } catch {
      // handled upstream
    }
  };

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Quick add</p>
          <h2>New task</h2>
        </div>
      </div>

      <form className="new-task-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="Fix login bug"
            value={form.title}
            onChange={handleChange}
            maxLength={255}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="Add enough context for the next developer"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </label>

        {localError ? <p className="alert alert-error">{localError}</p> : null}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create task'}
        </button>
      </form>
    </section>
  );
};

export default NewTaskForm;
