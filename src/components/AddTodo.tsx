import React, { ReactElement, useState } from 'react';
import {
  Flex,
  Input,
  IconButton,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  Heading,
} from '@chakra-ui/react';
import { HiOutlineTag } from 'react-icons/hi';
import { CalendarIcon } from '@chakra-ui/icons';

interface Props {
  addTodo: (todo: string) => void;
}

function AddTodo({ addTodo }: Props): ReactElement {
  const [addTodoInput, setAddTodoInput] = useState<string>('');
  const [date, setDate] = useState(new Date());
  return (
    <Flex>
      <Input
        value={addTodoInput}
        onChange={(e) => setAddTodoInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo(addTodoInput);
            setAddTodoInput('');
          }
        }}
        variant="flushed"
        placeholder="Add todo"
        mb={6}
        focusBorderColor="red.500"
        mr={3}
      />
      <Popover>
        <Box display="inline-block">
          <PopoverTrigger>
            <IconButton
              aria-label="select due date"
              icon={<CalendarIcon />}
              mr="2"
            />
          </PopoverTrigger>
        </Box>

        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Heading>Hello there</Heading>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <Box display="inline-block">
          <PopoverTrigger>
            <IconButton
              aria-label="select category"
              icon={<HiOutlineTag />}
              fontSize={'20px'}
            />
          </PopoverTrigger>
        </Box>

        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

export default AddTodo;
