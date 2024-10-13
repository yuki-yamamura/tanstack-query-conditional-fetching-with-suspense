"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

export const TodoList = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    enabled: isChecked,
  });

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
      {todos && todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
