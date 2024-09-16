import React from 'react'
import {
  InputGroup,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
} from "@chakra-ui/react"
import {
  ChevronUpIcon,
  ChevronDownIcon
} from "@chakra-ui/icons"

export default function CustomNumberInput({ name, value, onChange, min = 0, max = Infinity, step = 1 }) {
  return (
    <InputGroup>
      <NumberInput
        name={name}
        value={value}
        onChange={onChange}
        borderRadius={0}
        min={0}
        max={max}
        step={step}
        width="100%"
      >
        <NumberInputField borderRadius={0} />
        <NumberInputStepper
          mr={2}
        >
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
    </InputGroup>
  )
}

