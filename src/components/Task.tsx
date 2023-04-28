import React, { FunctionComponent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { ITodo } from "@/utils/types";
import { TODO_SCHEMA } from "@/utils/models";
import styles from "@/styles/TodoList/TodoList.module.css";

interface ITaskProps {
  task: ITodo;
  completeTask: (id: string) => void;
  setEditingId: (id: string) => void;
  removeTask: (id: string) => void;
  isEditing: boolean;
  editingValues: {
    name: string;
    description: string;
  };
  editingErrors: {
    name: boolean;
    description: boolean;
  };
  changeEditingValue: (key: string, value: string) => void;
  changeEditingIdHandler: (id: string) => void;
}

export const Task: FunctionComponent<ITaskProps> = ({
  task,
  completeTask,
  setEditingId,
  removeTask,
  isEditing,
  editingValues,
  editingErrors,
  changeEditingValue,
  changeEditingIdHandler,
}) => {

  return (
    <tr className={styles.tableRow}>
      {TODO_SCHEMA.map((column) => (
        <td
          key={column.property}
          className={`${isEditing ? styles.tableEditCell : styles.tableCell} ${
            task.completed ? styles.completed : ""
          }`}>
          {isEditing ? (
            <input
              className={`${styles.tableEditInput} ${editingErrors[column.property] ? styles.error : ""}`}
              value={editingValues[column.property]}
              onChange={(ev) =>
                changeEditingValue(column.property, ev.target.value)
              }
            />
          ) : (
            task[column.property]
          )}
        </td>
      ))}
      <td
        className={`${styles.tableIcon} ${
          task.completed ? styles.completed : ""
        }`}>
        <FontAwesomeIcon icon={faCheck} onClick={() => !isEditing && completeTask(task.id)} />
      </td>
      <td
        className={`${styles.tableIcon} ${isEditing ? styles.completed : ""}`}>
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => changeEditingIdHandler(task.id)}
        />
      </td>
      <td className={styles.tableIcon}>
        <FontAwesomeIcon icon={faRemove} onClick={() => !isEditing && removeTask(task.id)} />
      </td>
    </tr>
  );
};
