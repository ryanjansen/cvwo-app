import React, { ReactElement, useEffect, useState } from 'react';
import {
  Flex,
  Input,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
} from '@chakra-ui/react';
import { HiOutlineTag } from 'react-icons/hi';
import Datepicker from './Datepicker';

interface Props {
  addTodo: (
    todo: string,
    category: string | null,
    due_date: Date | null,
  ) => void;
}

function AddTodo({ addTodo }: Props): ReactElement {
  const [addTodoInput, setAddTodoInput] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  return (
    <Flex>
      <Input
        value={addTodoInput}
        onChange={(e) => setAddTodoInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo(addTodoInput, 'hello', date);
            setAddTodoInput('');
            setDate(null);
          }
        }}
        variant="flushed"
        placeholder="Add todo"
        mb={6}
        focusBorderColor="red.500"
        mr={3}
      />

      <Datepicker handleDateChange={handleDateChange} date={date} />
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
