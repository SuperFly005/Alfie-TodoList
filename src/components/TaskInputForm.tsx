import React, { FunctionComponent, useRef, useState } from "react";
import styles from "@/styles/TodoList/InputForm.module.css";

interface ITaskInputFormProps {
  addNewTask: (name: string, description: string) => void;
}

export const TaskInputForm: FunctionComponent<ITaskInputFormProps> = ({
  addNewTask,
}) => {
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const submitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    setNameError(!name);
    setDescriptionError(!description);
    if(!!name && !!description) {
      addNewTask(name, description);
      nameRef.current.value = '';
      descriptionRef.current.value = '';
    }
  };

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <input
        type="text"
        className={`${styles.formInput} ${styles.name} ${nameError ? styles.error : ''}`}
        placeholder="Name"
        ref={nameRef}
      />
      <input
        type="text"
        className={`${styles.formInput} ${styles.description} ${descriptionError ? styles.error : ''}`}
        placeholder="Description"
        ref={descriptionRef}
      />
      <button className={styles.formButton}>ADD</button>
    </form>
  );
};
