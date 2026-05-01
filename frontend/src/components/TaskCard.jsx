import { Draggable } from '@hello-pangea/dnd';

const statusLabel = {
  todo: 'Todo',
  in_progress: 'In progress',
  done: 'Done',
};

const TaskCard = ({ task, index, onDeleteTask }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <article
          className={`task-card ${snapshot.isDragging ? 'task-card-dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-card-topline">
            <span className={`task-status status-${task.status}`}>{statusLabel[task.status] || task.status}</span>
            <button className="icon-button" type="button" onClick={() => onDeleteTask(task.id)} aria-label={`Delete ${task.title}`}>
              ×
            </button>
          </div>
          <h3>{task.title}</h3>
          {task.description ? <p>{task.description}</p> : <p className="task-muted">No description provided.</p>}
        </article>
      )}
    </Draggable>
  );
};

export default TaskCard;
