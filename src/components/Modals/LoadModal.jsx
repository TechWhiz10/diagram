import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text,
  Select,
  Flex,
  Stack,
  FormLabel,
  useBreakpointValue,
  Input,
  Box,
} from '@chakra-ui/react'

import NumberInput from '../Inputs/NumberInput'
import NumberInputRight from '../Inputs/NumberInputRight';
import CustomCheckBox from '../CustomCheckbox';

export default function LoadModal({ isOpen, onClose, boxData, onSave, onDelete }) {
  const modalSize = useBreakpointValue({ base: 'full', md: '2xl' });
  const isDesktop = useBreakpointValue({ base: false, sm: true });
  const [wiringLabel, setWiringLabel] = useState('Wiring');

  const [formData, setFormData] = useState(boxData);

  useEffect(() => {
    setFormData(boxData);
  }, [boxData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    if (name === 'type') {
      setWiringLabel(value === 'sockets_radial' || value === 'sockets_ring' ? 'RCD & AFDD' : 'Wiring');
    }
  };

  
  const handleCheckbox = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      addtional_protection_rcd: false,
      addtional_protection_afdd: false,
      [name]: true,
    }));
  };


  const handleSave = () => {
    onSave(formData);
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='white' bgColor='blue.400'>
          Load Details
        </ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody>
          <Flex direction='column' gap={4} pt={4}>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel mb={isDesktop ? 0 : 4}>Ref & Description</FormLabel>
              <Stack flexBasis='70%' direction='row' justifyContent='space-between'>
                <Input name='ref' width='45%' value={formData['ref'] || ''} onChange={handleChange} borderRadius={0} />
                <Input name='description' value={formData['description'] || ''} onChange={handleChange} borderRadius={0} />
              </Stack>
            </Flex>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel flexBasis='40%' mb={isDesktop ? 0 : 4}>Type</FormLabel>
              <Select name='type' value={formData['type'] || ''} onChange={handleChange} borderRadius={0}>
                <option value='lighting'>Lighting</option>
                <option value='sockets_radial'>Sockets (radial)</option>
                <option value='sockets_ring'>Sockets (ring)</option>
                <option value='fixed_equipment'>Fixed Equipment</option>
              </Select>
            </Flex>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel mb={isDesktop ? 0 : 4}>{wiringLabel}</FormLabel>
              <Box flexBasis='70%' width={!isDesktop ? 'full' : ''} display='flex'>
                <Select name='rcd' border='none' value={formData['rcd'] || ''} onChange={handleChange} borderRadius={0}>
                  <option value='SP, 2wire'>SP, 2wire (MVP)</option>
                  <option value='3P, 3wire'>3P, 3wire (not in MVP)</option>
                  <option value='3P, 4wire'>3P, 4wire (not in MVP)</option>
                </Select>
              </Box>
            </Flex>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel mb={isDesktop ? 0 : 4}>Connected Load</FormLabel>
              <Flex flexBasis='70%' width={!isDesktop ? 'full' : ''} gap={4} justifyContent='flex-start' alignItems={`${isDesktop ? 'center' : 'flex-start'}`}>
                <NumberInput
                  name='unit'
                  value={formData['unit'] || 0}
                  onChange={(value) => handleChange({ 'target': { 'name': 'unit', value } })}
                  borderRadius={0}
                />
                <Text>Unit</Text>
                <Select name='load_type' value={formData['load_type'] || ''} onChange={handleChange} borderRadius={0}>
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                </Select>
              </Flex>
            </Flex>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel flexBasis='40%' mb={isDesktop ? 0 : 4}>Diversity Factory</FormLabel>
              <NumberInputRight
                name="diversity"
                value={formData['diversity'] || 0}
                onChange={(value) => handleChange({ 'target': { 'name': 'diversity', value } })}
                rightText={'%'}
              />
            </Flex>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel flexBasis='40%' mb={isDesktop ? 0 : 4}>Power Factor</FormLabel>
              <NumberInput
                name='power_factor'
                value={formData['power_factor'] || 0.95}
                onChange={(value) => handleChange({ 'target': { 'name': 'power_factor', value } })}
                borderRadius={0}
                min={0}
                step={0.01}
                max={1}
              />
            </Flex>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel mb={isDesktop ? 0 : 4}>Additional Protection</FormLabel>
              <Flex flexBasis='70%' direction='row' gap={4} alignItems='center' justifyContent='flex-start'>
                <Flex direction='row' alignItems='center'>
                  <FormLabel>RCD</FormLabel>
                  <CustomCheckBox name='addtional_protection_rcd' isChecked={formData['addtional_protection_rcd'] || false} onChange={handleCheckbox} />
                </Flex>
                <Flex direction='row' alignItems='center'>
                  <FormLabel>AFDD</FormLabel>
                  <CustomCheckBox name='addtional_protection_afdd' isChecked={formData['addtional_protection_afdd'] || false} onChange={handleCheckbox} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent='space-between' width='full'>
            <Button bgColor='gray.900' borderRadius={100} onClick={onDelete}>Delete</Button>
            <Button bgColor='blue.550' borderRadius={100} onClick={handleSave}>Save</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
