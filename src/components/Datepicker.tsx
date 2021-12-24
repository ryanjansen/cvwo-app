import React, { useState, ReactElement, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { CalendarIcon } from '@chakra-ui/icons';
import { Button, IconButton } from '@chakra-ui/react';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

import dayjs from 'dayjs';

interface Props {
  handleDateChange: (date: Date) => void;
  date: Date | null;
}

function Datepicker({ handleDateChange, date }: Props): ReactElement {
  const CustomButton = forwardRef(({ onClick }: any, ref) => {
    return date ? (
      <Button colorScheme={'red'} mr="2" onClick={onClick}>
        {dayjs(date).format('DD MMM')}
      </Button>
    ) : (
      <IconButton
        mr="2"
        onClick={onClick}
        aria-label="Choose due date"
        icon={<CalendarIcon />}
      />
    );
  });

  return (
    <ReactDatePicker
      onChange={handleDateChange}
      selected={date}
      customInput={<CustomButton />}
      popperPlacement='bottom'
      showPopperArrow
    />
  );
}

export default Datepicker;
