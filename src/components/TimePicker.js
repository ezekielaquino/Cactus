import React, { useState } from 'react';
import styled from '@emotion/styled';
import Rating from 'react-rating';


function TimePicker(props) {
  const { selectedValue = 0, onChange } = props;

  const handleChange = value => {
    onChange(null, { key: 'time', value });
  };

  return (
    <Wrap>
      <label>Expected time?</label>

      <Rating
        fractions={2}
        stop={8}
        initialRating={selectedValue }
        onChange={handleChange} />

      { selectedValue }
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin: 20px 0;
`;


export default TimePicker;