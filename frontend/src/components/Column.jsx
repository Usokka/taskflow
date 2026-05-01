import TaskCard from './TaskCard';

const Column = ({
  title,
  tone,
  tasks,
  loading,
  isDraggingOver,
  innerRef,
  droppableProps,
  placeholder,
  onDeleteTask,
}) => {
  return (
    <article className={`column column-${tone} ${isDraggingOver ? 'column-active' : ''}`} ref={innerRef} {...droppableProps}>
      <header className="column-header">
        <div>
          <h2>{title}</h2>
          <p>{tasks.length} task{tasks.length > 1 ? 's' : ''}</p>
        </div>
      </header>

      <div className="column-body">
        {loading ? <p className="column-placeholder">Loading tasks…</p> : null}
        {!loading && tasks.length === 0 ? (
          <p className="column-placeholder">Drop a task here.</p>
        ) : null}

        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} onDeleteTask={onDeleteTask} />
        ))}
        {placeholder}
      </div>
    </article>
  );
};

export default Column;
