import axios from 'axios';
import React, { useState, ReactElement, useEffect } from 'react';
import TodoItem from './TodoItem';
import type { Todo } from './types';
import { useAuth } from './useAuth';

import AddTodo from './components/AddTodo';
import { Container, VStack, Heading, StackDivider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Props {}

function Todos({}: Props): ReactElement {
  const auth = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);

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
    <Container maxW="container.sm" mt={10}>
      <Heading size="md" mb="3">
        Todos
      </Heading>
      <AddTodo
        addTodo={addTodo}
      />
      <VStack divider={<StackDivider borderColor="gray.100" />}>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleDelete={deleteTodo}
            handleUpdate={updateTodo}
          />
        ))}
      </VStack>
    </Container>
  );
}

export default Todos;
