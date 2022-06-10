import React, { useState, useEffect, useRef } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import { GrRefresh } from "react-icons/gr";
import { TodoItem } from "../model";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  item: TodoItem;
  index: number;
  onDelete: (id: number, isDone: boolean) => void;
  onCheck: (id: number, isDone: boolean) => void;
  onEdit: (id: number, content: string, isDone: boolean) => void;
}

const ToDoItem: React.FC<Props> = ({
  item,
  index,
  onDelete,
  onCheck,
  onEdit,
}: Props) => {
  const [viewInputBox, setViewInputBox] = useState<boolean>(false);
  const [input, setInput] = useState<string>(item.todoContent);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    setViewInputBox(false);
    if (input && input !== item.todoContent)
      onEdit(item.id, input, item.isDone);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [viewInputBox]);

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          className="todoitem"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {viewInputBox ? (
            <form onSubmit={submitHandler} className="todoitem__form">
              <input
                type="text"
                className="todoitem__input"
                ref={inputRef}
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setInput(e.target.value)
                }
              />
            </form>
          ) : (
            <p>{item.todoContent}</p>
          )}
          <div className="todoitem__icons">
            <span
              className="todoitem__icon"
              onClick={() => setViewInputBox((prev) => !prev)}
            >
              <FiEdit2 />
            </span>
            {!viewInputBox && (
              <>
                <span
                  className="todoitem__icon"
                  onClick={() => onDelete(item.id, item.isDone)}
                >
                  <RiDeleteBin6Line />
                </span>
                {item.isDone ? (
                  <span
                    className="todoitem__icon"
                    onClick={() => onCheck(item.id, item.isDone)}
                  >
                    <GrRefresh />
                  </span>
                ) : (
                  <span
                    className="todoitem__icon"
                    onClick={() => onCheck(item.id, item.isDone)}
                  >
                    <AiOutlineCheck />
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ToDoItem;
