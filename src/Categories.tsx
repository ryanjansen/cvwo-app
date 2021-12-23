import { Box, Button, Heading, VStack, Text , Spinner} from '@chakra-ui/react';
import React, { ReactElement, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  addCategory,
  selectCategories,
  fetchCategories,
  categoriesStatus,
} from './redux/categoriesSlice';
import type { Category, status } from './types';
import type { RootState } from './redux/store';

interface Props extends PropsFromRedux {
  categories: Category[];
  status: status;
}

function Categories({
  categories,
  addCategory,
  fetchCategories,
  status,
}: Props): ReactElement {
  console.log(categories);
  const handleClick = () => {
    addCategory('inbox');
  };

  useEffect(() => {
    if (status === 'idle') {
      fetchCategories();
    }
  }, [status]);

  if (status === 'loading') {
    return <Spinner></Spinner>
  }

  return (
    <Box>
      <Heading>Categories</Heading>
      <Button onClick={handleClick}>Add Category</Button>
      <VStack>
        {categories.map((c) => (
          <Text key={c.id}>{c.title}</Text>
        ))}
      </VStack>
    </Box>
  );
}

const connector = connect(
  (state: RootState) => ({
    categories: selectCategories(state),
    status: categoriesStatus(state),
  }),
  {
    addCategory,
    fetchCategories,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Categories);
