import React, { ReactElement, useState } from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Input,
  Checkbox,
  IconButton,
  Flex,
} from '@chakra-ui/react';

import type { Todo } from './types';

import dayjs from "dayjs";

interface Props {
  todo: Todo;
  handleDelete: (id: number) => void;
  handleUpdate: (done: boolean, id: number) => void;
}

function TodoItem({ todo, handleUpdate }: Props): ReactElement {
  const [isChecked, setIsChecked] = useState(todo.done);
  const dateString = dayjs(todo.due_date).format('DD MMM');
  console.log(dateString);
  return (
    <Flex w="100%" p={1}>
      <Checkbox
        isChecked={isChecked}
        mr={4}
        size="lg"
        onChange={(e) => {
          handleUpdate(!todo.done, todo.id);
          setIsChecked((prev) => !prev);
        }}
        colorScheme={"red"}
      />
      <Box>

      <Text>{todo.title}</Text>
      {todo.due_date && <Text fontSize={"sm"} color="gray.500">{dateString}</Text>}
      </Box>
    </Flex>
  );
}

export default TodoItem;
