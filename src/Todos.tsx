import axios from 'axios';
import React, { useState, ReactElement, useEffect } from 'react';
import TodoItem from './TodoItem';
import type { Todo } from './types';
import { useAuth } from './useAuth';

import { Container, VStack, Input, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Props {}

function Todos({}: Props): ReactElement {
  const auth = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addTodoInput, setAddTodoInput] = useState<string>('');

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get<Todo[]>('/api/todos', {
        withCredentials: true,
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addTodo = (title: string) => {
    axios
      .post(
        '/api/todos',
        {
          todo: { title, done: false, category: 'study' },
        },
        { withCredentials: true },
      )
      .then((res) => {
        const newTodos = [res.data, ...todos];
        setTodos(newTodos);
        setAddTodoInput('');
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id: number) => {
    axios
      .delete(`/api/todos/${id}`, { withCredentials: true })
      .then((res) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((err) => console.log(err));
  };

  const updateTodo = (done: boolean, id: number) => {
    axios
      .put(`/api/todos/${id}`, { todo: { done } }, { withCredentials: true })
      .then((res) => {
        const newTodos = todos;
        const index = newTodos.findIndex((todo) => todo.id === res.data.id);
        newTodos[index] = res.data;
        setTodos(newTodos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container p={4}>
      <Input
        value={addTodoInput}
        onChange={(e) => setAddTodoInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo(addTodoInput);
          }
        }}
        variant="flushed"
        placeholder="Add todo"
        mb={4}
      />
      <VStack>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleDelete={deleteTodo}
            handleUpdate={updateTodo}
          />
        ))}
      </VStack>
      <Button
        onClick={() => {
          auth.logout(() => navigate('/', { replace: true }));
        }}
        colorScheme="red"
      >
        Logout
      </Button>
    </Container>
  );
}

export default Todos;
