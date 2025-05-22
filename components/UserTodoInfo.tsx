"use client";

import { useEffect, useState } from "react";
import {  useSession } from "next-auth/react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTranslations} from "next-intl";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: string;
}


const UserTodoInfo = () => {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      if (session) {
        const res = await fetch('/api/todos');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setTodos(data); // Update state with fetched TODOs
          } else {
            console.error("Expected an array of TODOs, but got:", data);
          }
        } else {
          console.error("Failed to fetch TODOs");
        }
      }
    };

    fetchTodos();
  }, [session]); // Dependency array includes session

  const handleAddTodo = async (todo: Omit<Todo, '_id'>) => {
    if (!session || !session.user) {
      console.error("User is not authenticated");
      return;
    }

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo, userId: session.user.id }),
    });

    if (res.ok) {
      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
    } else {
      console.error("Failed to add TODO");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  const handleUpdateTodo = async (todo: Todo) => {
  
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (res.ok) {
      const updatedTodo = await res.json();
      setTodos((prev) =>
        prev.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
      );
      setEditingTodo(null);
    } else {
      console.error("Failed to update TODO");
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo); 
    setIsFormOpen(true); 
  };

  // Filter todos based on the search input
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  const t = useTranslations('my-todo');

  return (
    <div className="grid place-items-center h-screen">
      <div className="overflow-x-auto shadow-lg p-5 h-screen w-7xl">
        <h1 className="text-2xl mb-4 text-center font-medium">{t("todoList")}</h1>
        <div className="flex justify-between mb-4">
        <button
          onClick={() => {
            setEditingTodo(null);
            setIsFormOpen(true);
          }}
          className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded mb-4 h-fit w-fit"
        >
          
          {t('addTodo')}
        </button>
        <input
        type="text"
        placeholder={t('searchTodo')}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4"
        />
        </div>
        {isFormOpen && (
          <TodoForm
            onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
            onClose={() => setIsFormOpen(false)}
            initialData={
              editingTodo
                ? {
                    title: editingTodo.title,
                    description: editingTodo.description,
                    _id: editingTodo._id,
                    status: editingTodo.status,
                  }
                : undefined
            }
          />
        )}
        <TodoList
          todos={filteredTodos}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      </div>
    </div>
  );
};

export default UserTodoInfo;
