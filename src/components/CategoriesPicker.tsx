import {
  Box,
  VStack,
  Text,
  Flex,
  Input,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Circle,
  StackDivider,
} from '@chakra-ui/react';
import { HiOutlineTag } from 'react-icons/hi';
import React, { ReactElement, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  addCategory,
  selectCategories,
  fetchCategories,
  categoriesStatus,
} from '../redux/categoriesSlice';
import categoryColors from '../config/categoryColors';

import type { Category, status } from '../config/types';
import type { RootState } from '../redux/store';
interface Props extends PropsFromRedux {
  categories: Category[];
  status: status;
  category: Category | null;
  handleCategoryChange: (category: Category) => void;
}

function CategoriesPicker({
  categories,
  category,
  handleCategoryChange,
  addCategory,
  fetchCategories,
  status,
}: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const [addCategoryInput, setAddCategoryInput] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      fetchCategories();
    }
  }, [status]);

  const handleAddCategory = (title: string) => {};

  return (
    <Popover isOpen={isOpen} onClose={close}>
      <PopoverTrigger>
        <IconButton
          aria-label="select category"
          icon={<HiOutlineTag />}
          fontSize={'20px'}
          colorScheme={category?.color.split('.')[0]}
          onClick={open}
        />
      </PopoverTrigger>

      <PopoverContent w="fit-content" p={0}>
        <PopoverArrow />
        <PopoverBody p={0}>
          <VStack divider={<StackDivider />} spacing={0}>
            {categories.map((c) => (
              <Box
                display="flex"
                justifyContent="center"
                w="100%"
                cursor={'pointer'}
                p={2}
                _hover={{ background: 'gray.100' }}
                transition="background 0.2s linear"
                onClick={() => {
                  handleCategoryChange(c);
                  close();
                }}
              >
                <Flex minW="100px" px={4} mx="auto" alignItems={'center'}>
                  <Circle
                    mr={3}
                    bgColor={categoryColors[c.color]}
                    w="10px"
                    h="10px"
                  ></Circle>
                  <Text>{c.title}</Text>
                </Flex>
              </Box>
            ))}
            <Input
              focusBorderColor="red.500"
              width="150px"
              placeholder="+ Add Category"
              variant="flushed"
              textAlign={'center'}
              value={addCategoryInput}
              onChange={(e) => setAddCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const color =
                    categoryColors.entities[
                      (categories.length + 1) % categoryColors.entities.length
                    ];
                  addCategory({ title: addCategoryInput, color });
                  setAddCategoryInput('');
                }
              }}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
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

export default connector(CategoriesPicker);
