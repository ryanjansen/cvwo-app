import React, { ReactElement, useEffect, useState } from 'react';
import { Flex, Input } from '@chakra-ui/react';
import Datepicker from './Datepicker';
import CategoriesPicker from './CategoriesPicker';
import type { Category } from '../types';

interface Props {
  addTodo: (
    todo: string,
    category_id: number | undefined,
    due_date: Date | null,
  ) => void;
}

function AddTodo({ addTodo }: Props): ReactElement {
  const [addTodoInput, setAddTodoInput] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleCategoryChange = (category: Category) => {
    setCategory(category);
  };

  return (
    <Flex>
      <Input
        value={addTodoInput}
        onChange={(e) => setAddTodoInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo(addTodoInput, category?.id, date);
            setAddTodoInput('');
            setDate(null);
            setCategory(null);
          }
        }}
        variant="flushed"
        placeholder="Add todo"
        mb={6}
        focusBorderColor="red.500"
        mr={3}
      />

      <Datepicker handleDateChange={handleDateChange} date={date} />
      <CategoriesPicker
        category={category}
        handleCategoryChange={handleCategoryChange}
      />
    </Flex>
  );
}

export default AddTodo;
