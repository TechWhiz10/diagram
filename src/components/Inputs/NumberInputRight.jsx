import React from 'react'
import {
  InputGroup,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightElement,
  NumberInputField,
  Text
} from "@chakra-ui/react"
import {
  ChevronUpIcon,
  ChevronDownIcon
} from "@chakra-ui/icons"

export default function NumberInputRight({ name, value, onChange, rightText }) {
  return (
    <InputGroup>
      <NumberInput
        name={name}
        value={value}
        onChange={onChange}
        borderRadius={0}
        min={0}
        width="100%"
      >
        <NumberInputField borderRadius={0} />
        <NumberInputStepper pr="3.3rem">
          <NumberIncrementStepper
            fontSize={20}
            border='none'
            children={<ChevronUpIcon />}
          />
          <NumberDecrementStepper
            border='none'
            fontSize={20}
            children={<ChevronDownIcon />}
          />
        </NumberInputStepper>
      </NumberInput>
      <InputRightElement
        pointerEvents="none"
        height="100%"
        borderRadius={0}
        width="2.9rem"  // Ensure width is appropriate
        justifyContent="center"
        p={1}
        position="absolute"  // Keep it positioned inside InputGroup
        right="0"  // Align to the right side
      >
        <Text
          bgColor='#F9F9F9'
          width='100%'
          height='100%'
          textAlign='center'
          alignContent='center'
        >
          {rightText}
        </Text>
      </InputRightElement>
    </InputGroup>
  )
}

