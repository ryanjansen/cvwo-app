import axios from 'axios';
import React, { useState, ReactElement, useEffect } from 'react';
import TodoItem from './TodoItem';
import type { Todo } from './types';

import { Container, VStack, Input, Heading } from '@chakra-ui/react';

interface Props {
  token: string;
}

function Todos({ token }: Props): ReactElement {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addTodoInput, setAddTodoInput] = useState<string>('');

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get<Todo[]>('http://localhost:3000/todos', {
        headers: {
          token,
        },
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addTodo = (title: string) => {
    axios
      .post(
        'http://localhost:3000/todos',
        {
          todo: { title, done: false, category: 'study' },
        },
        { headers: { token } },
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
      .delete(`http://localhost:3000/todos/${id}`, { headers: { token } })
      .then((res) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((err) => console.log(err));
  };

  const updateTodo = (done: boolean, id: number) => {
    axios
      .put(
        `http://localhost:3000/todos/${id}`,
        { todo: { done } },
        { headers: { token } },
      )
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
    </Container>
  );
}

export default Todos;
