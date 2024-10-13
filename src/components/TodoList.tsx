"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

const getTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = (await res.json()) as Todo[];

  return todos;
};

const TodoList = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div>
      <label className="flex gap-x-2">
        <span className=" after:content-[':']">show todo list</span>
        <input
          type="checkbox"
          checked={isChecked}
          onClick={handleCheckboxClick}
        />
      </label>
      {isChecked && (
        <Suspense fallback={<div>Loading...</div>}>
          <Component shouldShowTodos={isChecked} />
        </Suspense>
      )}
    </div>
  );
};

const Component = ({ shouldShowTodos }: { shouldShowTodos: boolean }) => {
  const { data: todos } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: () => (shouldShowTodos ? getTodos() : null),
  });

  return (
    todos &&
    todos.length > 0 && (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    )
  );
};

export { TodoList };
