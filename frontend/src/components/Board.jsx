import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from './Column';

const COLUMN_META = [
  { id: 'todo', label: 'Todo', tone: 'neutral' },
  { id: 'in_progress', label: 'In Progress', tone: 'warning' },
  { id: 'done', label: 'Done', tone: 'success' },
];

const Board = ({ tasks, loading, onDragEnd, onDeleteTask }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="board-grid">
        {COLUMN_META.map((column) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided, snapshot) => (
              <Column
                title={column.label}
                tone={column.tone}
                tasks={tasks[column.id] || []}
                loading={loading}
                isDraggingOver={snapshot.isDraggingOver}
                innerRef={provided.innerRef}
                droppableProps={provided.droppableProps}
                placeholder={provided.placeholder}
                onDeleteTask={onDeleteTask}
              />
            )}
          </Droppable>
        ))}
      </section>
    </DragDropContext>
  );
};

export default Board;
