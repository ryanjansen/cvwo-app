import React, { ReactElement, useState } from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Input,
  Checkbox,
  IconButton,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';

import type { Todo } from './types';

interface Props {
  todo: Todo;
  handleDelete: (id: number) => void;
  handleUpdate: (done: boolean, id: number) => void;
}

function TodoItem({ todo, handleDelete, handleUpdate }: Props): ReactElement {
  const [isChecked, setIsChecked] = useState(todo.done);
  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent={'space-between'}
    >
      <Text>{todo.title}</Text>
      <Box display="flex" alignItems={'center'}>
        <Checkbox
          isChecked={isChecked}
          mr={4}
          size="lg"
          onChange={(e) => {
            handleUpdate(!todo.done, todo.id);
            setIsChecked((prev) => !prev);
          }}
        />
        <IconButton
          colorScheme="red"
          aria-label="delete todo"
          icon={<DeleteIcon />}
          size="xs"
          onClick={(e) => handleDelete(todo.id)}
        />
      </Box>
    </Box>
  );
}

export default TodoItem;
