import { useState } from "react";
import Head from "next/head";
import { v4 as uuidV4 } from "uuid";
import { TaskInputForm } from "@/components/TaskInputForm";
import { TodoList } from "@/components/TodoList";
import { ITodo } from "@/utils/types";
import styles from "@/styles/TodoList/Page.module.css";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [editingId, setEditingId] = useState<string>("");

  const addNewTask = (name: string, description: string) => {
    setTodos([
      ...todos,
      {
        id: uuidV4(),
        name,
        description,
        completed: false,
      },
    ]);
  };

  const completeTask = (_id: string) => {
    const id = todos.findIndex((task) => task.id === _id);
    if (id >= 0) {
      const _todos = [...todos];
      _todos[id].completed = !_todos[id].completed;
      setTodos(_todos);
    }
  };

  const editTask = (_id: string, name: string, description: string) => {
    const id = todos.findIndex((task) => task.id === _id);
    if (id >= 0) {
      const _todos = [...todos];
      _todos[id].name = name;
      _todos[id].description = description;
      setTodos(_todos);
    }
  };

  const removeTask = (_id: string) => {
    const _todos = todos.filter((task) => task.id !== _id);
    setTodos(_todos);
  };

  return (
    <>
      <Head>
        <title>Alfie - Todo List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <p className={styles.title}>TODO-List</p>
        <TaskInputForm addNewTask={addNewTask} />
        <TodoList
          todos={todos}
          editingId={editingId}
          completeTask={completeTask}
          setEditingId={(id: string) => setEditingId(id)}
          editTask={editTask}
          removeTask={removeTask}
        />
      </div>
    </>
  );
}
