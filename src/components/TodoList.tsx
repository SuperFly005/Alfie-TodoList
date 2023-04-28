import React, { FunctionComponent, useEffect, useState } from "react";
import { Task } from "@/components/Task";
import { ITodo } from "@/utils/types";
import { TODO_SCHEMA } from "@/utils/models";
import styles from "@/styles/TodoList/TodoList.module.css";

interface ITodoListProps {
  todos: ITodo[];
  editingId: string;
  completeTask: (id: string) => void;
  editTask: (id: string, name: string, description: string) => void;
  setEditingId: (id: string) => void;
  removeTask: (id: string) => void;
}

export const TodoList: FunctionComponent<ITodoListProps> = ({
  todos,
  editingId,
  completeTask,
  editTask,
  setEditingId,
  removeTask,
}) => {
  const [editingValues, setEditingValues] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });
  const [editingErrors, setEditingErrors] = useState<{
    name: boolean;
    description: boolean;
  }>({ name: false, description: false });

  const changeEditingValue = (key: string, value: string) => {
    const _editingValues = {
      ...editingValues,
      [key]: value,
    };
    editTask(editingId, _editingValues.name, _editingValues.description);
    setEditingValues(_editingValues);
  }

  useEffect(() => {
    const _id = todos.findIndex((task) => (task.id === editingId));
    if(_id >= 0) {
      setEditingValues({
        name: todos[_id].name,
        description: todos[_id].description,
      });
      setEditingErrors({
        name: false,
        description: false,
      })
    }
  }, [editingId, todos])

  const changeEditingIdHandler = (id: string) => {
    const _editingErrors = {
      name: !editingValues.name,
      description: !editingValues.description,
    }
    setEditingErrors(_editingErrors);
    if (!editingId || !!editingValues.name && !!editingValues.description) {
      setEditingId(editingId === id ? "" : id);
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.tableContainer}>
        <thead>
          <tr className={styles.tableHeader}>
            {TODO_SCHEMA.map((column) => (
              <th key={column.property} className={styles.tableCell}>
                {column.display}
              </th>
            ))}
            <th colSpan={3} />
          </tr>
        </thead>
        <tbody>
          {todos.map((task) => (
            <Task
              key={task.id}
              task={task}
              completeTask={completeTask}
              setEditingId={setEditingId}
              removeTask={removeTask}
              isEditing={editingId === task.id}
              editingValues={editingValues}
              editingErrors={editingErrors}
              changeEditingValue={changeEditingValue}
              changeEditingIdHandler={changeEditingIdHandler}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
