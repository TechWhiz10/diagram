import React from 'react';
import { Box, useCheckbox } from '@chakra-ui/react';
import CheckIcon from '../svg/check.svg'

const CustomCheckbox = ({ ...props }) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps } = useCheckbox(props);

  return (
    <label
      {...getLabelProps()}
    >
      <Box
        {...getCheckboxProps()}
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        width={10}
        height={10}
        borderRadius="none"
        borderWidth="1px"
        borderColor="gray.200"
        backgroundColor={"white"}
        _before={{
          content: `url(${CheckIcon})`,
          display: state.isChecked ? 'block' : 'none',
          position: 'absolute',
          top: '55%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          width: '30px',
          height: '30px',
        }}
      >
        <input {...getInputProps()} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }} />
      </Box>
    </label>
  );
};

export default CustomCheckbox;
