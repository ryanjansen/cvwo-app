import React, { ReactElement, useState } from 'react';
import { Box, Text, Checkbox, Flex, Circle } from '@chakra-ui/react';
import categoryColors from '../config/categoryColors';

import type { Todo } from '../config/types';

import dayjs from 'dayjs';

interface Props {
  todo: Todo;
  handleUpdate: (id: number) => void;
}

function TodoItem({ todo, handleUpdate }: Props): ReactElement {
  const [isChecked, setIsChecked] = useState(todo.done);
  const dateString = dayjs(todo.due_date).format('DD MMM');
  return (
    <Flex w="100%" p={1} justifyContent={"space-between"}>
      <Flex>
        <Checkbox
          isChecked={isChecked}
          mr={4}
          size="lg"
          onChange={(e) => {
            setIsChecked((prev) => !prev);
            setTimeout(() => handleUpdate(todo.id), 300);
          }}
          colorScheme={'red'}
        />
        <Box>
          <Text>{todo.title}</Text>
          {todo.due_date && (
            <Text fontSize={'sm'} color="gray.500">
              {dateString}
            </Text>
          )}
        </Box>
      </Flex>
      {todo.category && (
        <Flex alignItems={'center'}>
          <Circle
            mr={3}
            bgColor={categoryColors[todo.category.color]}
            w="10px"
            h="10px"
          ></Circle>
          <Text>{todo.category.title}</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default TodoItem;
