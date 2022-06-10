import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import ToDoList from "./components/ToDoList";
import { TodoItem } from "./model";
import { DragDropContext } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [activeTodoList, setActiveTodoList] = useState<TodoItem[]>([]);
  const [completedTodoList, setCompletedTodoList] = useState<TodoItem[]>([]);

  const addItemHandler = (itemContent: string): void => {
    setActiveTodoList((prev: TodoItem[]) => {
      return [
        {
          id: Date.now(),
          todoContent: itemContent,
          isDone: false,
        },
        ...prev,
      ];
    });
  };

  const deleteHandler = (id: number, isDone: boolean): void => {
    if (isDone) {
      setCompletedTodoList((prev: TodoItem[]) => {
        return prev.filter((item) => item.id !== id);
      });
    } else {
      setActiveTodoList((prev: TodoItem[]) => {
        return prev.filter((item: TodoItem) => item.id !== id);
      });
    }
  };

  const checkHandler = (id: number, isDone: boolean): void => {
    if (isDone) {
      let removed: TodoItem;
      setCompletedTodoList((prev: TodoItem[]) => {
        const result = prev.find((item: TodoItem) => item.id === id);
        if (result) {
          removed = result;
        }
        return prev.filter((item: TodoItem) => item.id !== id);
      });
      setActiveTodoList((prev: TodoItem[]) => {
        return [...prev, { ...removed, isDone: false }];
      });
    } else {
      let removed: TodoItem;
      setActiveTodoList((prev: TodoItem[]) => {
        const result = prev.find((item: TodoItem) => item.id === id);
        if (result) {
          removed = result;
        }
        return prev.filter((item: TodoItem) => item.id !== id);
      });
      setCompletedTodoList((prev: TodoItem[]) => {
        return [{ ...removed, isDone: true }, ...prev];
      });
    }
  };

  const editHandler = (id: number, content: string, isDone: boolean): void => {
    if (isDone) {
      setCompletedTodoList((prev: TodoItem[]) => {
        return prev.map((item: TodoItem): TodoItem => {
          if (item.id !== id) return item;
          return {
            ...item,
            todoContent: content,
          };
        });
      });
    } else {
      setActiveTodoList((prev: TodoItem[]) => {
        return prev.map((item: TodoItem): TodoItem => {
          if (item.id !== id) return item;
          return {
            ...item,
            todoContent: content,
          };
        });
      });
    }
  };

  const dragEndHandler = (result: any): void => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (destination.droppableId === source.droppableId) {
      switch (source.droppableId) {
        case "todosActive":
          setActiveTodoList((prev: TodoItem[]) => {
            const newList = [...prev];
            const [removed] = newList.splice(source.index, 1);
            newList.splice(destination.index, 0, removed);
            return newList;
          });
          break;
        case "todosCompleted":
          setCompletedTodoList((prev: TodoItem[]) => {
            const newList = [...prev];
            const [removed] = newList.splice(source.index, 1);
            newList.splice(destination.index, 0, removed);
            return newList;
          });
          break;
      }
    } else {
      let removed: TodoItem;
      switch (destination.droppableId) {
        case "todosCompleted":
          setActiveTodoList((prev: TodoItem[]) => {
            const newList = [...prev];
            [removed] = newList.splice(source.index, 1);
            return newList;
          });
          setCompletedTodoList((prev: TodoItem[]) => {
            return [{ ...removed, isDone: true }, ...prev];
          });
          break;
        case "todosActive":
          setCompletedTodoList((prev: TodoItem[]) => {
            const newList = [...prev];
            [removed] = newList.splice(source.index, 1);
            return newList;
          });
          setActiveTodoList((prev: TodoItem[]) => {
            return [...prev, { ...removed, isDone: false }];
          });
          break;
      }
    }
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <div className="app">
        <span className="heading">Pandora</span>
        <InputField onAdd={addItemHandler} />
        <ToDoList
          activeListItems={activeTodoList}
          completedListItems={completedTodoList}
          onDelete={deleteHandler}
          onCheck={checkHandler}
          onEdit={editHandler}
        />
      </div>
    </DragDropContext>
  );
};
export default App;
