import React from "react";
import { TodoItem } from "../model";
import ToDoItem from "./ToDoItem";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  activeListItems: TodoItem[];
  completedListItems: TodoItem[];
  onDelete: (id: number, isDone: boolean) => void;
  onCheck: (id: number, isDone: boolean) => void;
  onEdit: (id: number, content: string, isDone: boolean) => void;
}

const ToDoList: React.FC<Props> = ({
  activeListItems,
  completedListItems,
  onDelete,
  onCheck,
  onEdit,
}: Props) => {
  const emptyActiveArrayText = "No Active Tasks. Maybe add one?";
  const emptyCompletedArrayText = "Your completed Tasks will appear here.";
  return (
    <div className="todolists">
      <div className="todolist">
        <Droppable droppableId="todosActive">
          {(provided) => (
            <div
              className="todolist active"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h3>Active Tasks</h3>
              {activeListItems.length === 0 ? (
                <p className="empty-text">{emptyActiveArrayText}</p>
              ) : (
                activeListItems.map((listItem, index) => {
                  return (
                    <ToDoItem
                      key={listItem.id}
                      item={listItem}
                      index={index}
                      onDelete={onDelete}
                      onCheck={onCheck}
                      onEdit={onEdit}
                    />
                  );
                })
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="todolist">
        <Droppable droppableId="todosCompleted">
          {(provided) => (
            <div
              className="completed"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h3>Completed Tasks</h3>
              {completedListItems.length == 0 ? (
                <p className="empty-text">{emptyCompletedArrayText}</p>
              ) : (
                completedListItems.map((listItem, index) => {
                  return (
                    <ToDoItem
                      key={listItem.id}
                      item={listItem}
                      index={index}
                      onDelete={onDelete}
                      onCheck={onCheck}
                      onEdit={onEdit}
                    />
                  );
                })
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default ToDoList;
