import axios from 'axios';
import React, { useState, ReactElement, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TodoItem from './TodoItem';
import type { Todo } from './types';

import Categories from './Categories';

import AddTodo from './components/AddTodo';
import { Container, VStack, Heading, StackDivider, Button } from '@chakra-ui/react';

interface Props {}

function Todos({}: Props): ReactElement {
  const [todos, setTodos] = useState<Todo[]>([]);
  const category = useParams().category;

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get<{todos: Todo[]}>('/api/todos', {
        withCredentials: true,
      })
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => console.log(err));
  };

  const addTodo = (
    title: string,
    category: string | null,
    date: Date | null,
  ) => {
    axios
      .post(
        '/api/todos',
        {
          todo: { title, done: false, category: category, due_date: date },
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

  const shownTodos =
    category !== 'inbox'
      ? todos.filter((todo) => todo.category === category)
      : todos;

  console.log(todos);

  return (
    <Container maxW="container.sm" mt={10}>
      <Heading size="md" mb="3">
        Todos
      </Heading>
      <AddTodo addTodo={addTodo} />
      <VStack divider={<StackDivider borderColor="gray.100" />}>
        {shownTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} handleUpdate={deleteTodo} />
        ))}
      </VStack>
      <Button as={Link} to={"/app/hello"}>Hello</Button>
    </Container>
  );
}

export default Todos;
