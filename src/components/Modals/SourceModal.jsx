import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Box,
  Select,
  Flex,
  FormLabel,
  useBreakpointValue,
  Image,
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement
} from '@chakra-ui/react';
import ChevronUpIcon from '../../svg/chevron-up.svg';
import CustomCheckBox from '../CustomCheckbox';
import NumberInputRight from '../Inputs/NumberInputRight';

function ProtectionLinkModal({ isOpen, onClose, onSave, initialLink }) {
  const [link, setLink] = useState(initialLink || '');
  const modalSize = useBreakpointValue({ base: 'full', md: 'sm' });

  const handleSave = () => {
    onSave(link);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='white' bgColor='blue.400'>
          Edit Protection Link
        </ModalHeader>
        <ModalBody>
          <Flex direction='column' gap={4}>
            <Input
              type='text'
              borderRadius={0}
              placeholder='Enter link'
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button bgColor='gray.600' borderRadius={100} mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button bgColor='blue.550' borderRadius={100} onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Volt Drop Modal Component
function VoltDropModal({ isOpen, onClose, onReturn, formData, setFormData }) {
  const isDesktop = useBreakpointValue({ base: false, sm: true });
  const modalSize = useBreakpointValue({ base: 'full', md: '2xl' });
  const [voltDropData, setVoltDropData] = useState({});

  useEffect(() => {
    if (formData?.voltDropData)
      setVoltDropData(formData?.voltDropData)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoltDropData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { name } = e.target;
    setVoltDropData((prevData) => ({
      public_checked: false,
      private_checked: false,
      user_defined_checked: false,
      [name]: true,
    }));
  };


  const handleSave = () => {
    setFormData(prevData => ({ ...prevData, voltDropData }));
    onReturn()
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='white' bgColor='blue.400' display='flex' alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
          Volt Drop Settings
          <Button ml='auto' onClick={onReturn} variant='none' color='white' pr={0}>
            <Image src={ChevronUpIcon} height={5} mr={2} />
            Cancel
          </Button>
        </ModalHeader>
        <ModalBody>
          <Flex direction='column' gap={4} pt={4}>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel mt={6} mb={isDesktop ? 0 : 4}>Public</FormLabel>
              <Stack flexBasis='70%' direction='row' justifyContent='space-between'>
                <Box mt={7}>
                  <CustomCheckBox name='public_checked' isChecked={voltDropData['public_checked'] || false} onChange={handleCheckbox} />
                </Box>
                <Box width='30%'>
                  <Text textAlign='center' mb={1}>LIGHTING</Text>
                  <InputGroup size='md'>
                    <Input
                      type='number'
                      name='public_percent1'
                      placeholder='0'
                      borderRadius={0}
                      value={voltDropData['public_percent1'] || 3}
                      disabled
                      onChange={handleChange}
                      min={0}
                    />
                    <InputRightElement width='2.5rem' px={2} py={1}>
                      <Box bgColor='gray.200' width='100%' textAlign='center' alignContent='center' height='100%'>
                        %
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box width='30%'>
                  <Text textAlign='center' mb={1}>OTHER</Text>
                  <InputGroup size='md'>
                    <Input
                      type='number'
                      name='public_percent2'
                      placeholder='0'
                      value={voltDropData['public_percent2'] || 5}
                      onChange={handleChange}
                      disabled
                      borderRadius={0}
                      min={0}
                    />
                    <InputRightElement width='2.5rem' px={2} py={1}>
                      <Box bgColor='gray.200' width='100%' textAlign='center' alignContent='center' height='100%'>
                        %
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Stack>
            </Flex>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel mb={isDesktop ? 0 : 4}>Private</FormLabel>
              <Stack flexBasis='70%' direction='row' justifyContent='space-between'>
                <CustomCheckBox name='private_checked' isChecked={voltDropData['private_checked'] || false} onChange={handleCheckbox} />
                <InputGroup size='md' width='30%'>
                  <Input
                    type='number'
                    placeholder='0'
                    name='private_percent1'
                    borderRadius={0}
                    disabled
                    value={voltDropData['private_percent1'] || 6}
                    onChange={handleChange}
                    min={0}
                  />
                  <InputRightElement width='2.5rem' px={2} py={1}>
                    <Box bgColor='gray.200' width='100%' textAlign='center' alignContent='center' height='100%'>
                      %
                    </Box>
                  </InputRightElement>
                </InputGroup>
                <InputGroup size='md' width='30%'>
                  <Input
                    type='number'
                    name='private_percent2'
                    placeholder='0'
                    value={voltDropData['private_percent2'] || 8}
                    onChange={handleChange}
                    disabled
                    borderRadius={0}
                    min={0}
                  />
                  <InputRightElement width='2.5rem' px={2} py={1}>
                    <Box bgColor='gray.200' width='100%' textAlign='center' alignContent='center' height='100%'>
                      %
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </Flex>
            <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
              <FormLabel mb={isDesktop ? 0 : 4}>User Defined</FormLabel>
              <Stack flexBasis='70%' direction='row' justifyContent='space-between'>
                <CustomCheckBox name='user_defined_checked' isChecked={voltDropData['user_defined_checked'] || false} onChange={handleCheckbox} />
                <InputGroup size='md' width='30%'>
                  <Input
                    type='number'
                    name='user_defined_percent1'
                    placeholder='0'
                    borderRadius={0}
                    value={voltDropData['user_defined_percent1'] || 0}
                    onChange={handleChange}
                    min={0}
                  />
                  <InputRightElement width='2.5rem' px={2} py={1}>
                    <Box bgColor='gray.200' width='100%' textAlign='center' alignContent='center' height='100%'>
                      %
                    </Box>
                  </InputRightElement>
                </InputGroup>
                <InputGroup size='md' width='30%'>
                  <Input
                    type='number'
                    name='user_defined_percent2'
                    placeholder='0'
                    value={voltDropData['user_defined_percent2'] || 0}
                    onChange={handleChange}
                    borderRadius={0}
                    min={0}
                  />
                  <InputRightElement width='2.5rem' px={2} py={1}>
                    <Box bgColor='gray.200' width='100%' textAlign='center' alignContent='center' height='100%'>
                      %
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button bgColor='gray.600' borderRadius={100} mr={2} onClick={onReturn}>Cancel</Button>
          <Button bgColor='blue.550' borderRadius={100} onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Source Modal Component
export default function SourceModal({ isOpen, onClose, boxData, onSave, onDelete }) {
  const modalSize = useBreakpointValue({ base: 'full', md: '2xl' });
  const isDesktop = useBreakpointValue({ base: false, sm: true });
  const [formData, setFormData] = useState(boxData);
  const [isVoltDropModalOpen, setVoltDropModalOpen] = useState(false);
  const [isProtectionLinkModalOpen, setProtectionLinkModalOpen] = useState(false);
  const [protectionLink, setProtectionLink] = useState(formData.protection_link || '');

  useEffect(() => {
    setFormData(boxData);
  }, [boxData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const openVoltDropModal = () => {
    setVoltDropModalOpen(true);
  };

  const closeVoltDropModal = () => {
    setVoltDropModalOpen(false);
  };

  const handleReturnToSource = () => {
    closeVoltDropModal();
  };

  const openProtectionLinkModal = () => {
    setProtectionLinkModalOpen(true);
  };

  const closeProtectionLinkModal = () => {
    setProtectionLinkModalOpen(false);
  };

  const handleSaveProtectionLink = (link) => {
    setProtectionLink(link);  // Update local state
    setFormData(prevData => ({ ...prevData, protection_link: link }));  // Update parent state
  };

  return (
    <>
      <Modal isOpen={isOpen && !isVoltDropModalOpen} onClose={onClose} isCentered size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='white' bgColor='blue.400'>
            Source Details
          </ModalHeader>
          <ModalCloseButton color='white' />
          <ModalBody>
            <Flex direction='column' gap={4}>
              <Flex direction='column' gap={4}>
                <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
                  <FormLabel mb={isDesktop ? 0 : 4}>Ownership</FormLabel>
                  <Stack flexBasis='70%' direction='row' justifyContent='space-between'>
                    <Input
                      type='text'
                      name='ownership'
                      placeholder='User Defined'
                      value={formData['ownership'] || ''}
                      onChange={handleChange}
                      borderRadius={0}
                    />
                    <Button bgColor='blue.550' width='50%' borderRadius={100} onClick={openVoltDropModal}>
                      Volt drop settings
                    </Button>
                  </Stack>
                </Flex>
                <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
                  <FormLabel flexBasis='40%' mb={isDesktop ? 0 : 4}>Single / Three Phase</FormLabel>
                  <Select name='phase' value={formData['phase'] || ''} onChange={handleChange} borderRadius={0}>
                    <option value='single'>Single</option>
                  </Select>
                </Flex>
                <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
                  <FormLabel flexBasis='40%' mb={isDesktop ? 0 : 4}>Fault Level</FormLabel>
                  <NumberInputRight
                    name="faultLevel"
                    value={formData['faultLevel'] || 0}
                    onChange={(value) => handleChange({ target: { name: 'faultLevel', value } })}
                    rightText={'kA'}
                  />
                </Flex>
                <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
                  <FormLabel flexBasis='40%' mb={isDesktop ? 0 : 4}>Earth Fault Impedance</FormLabel>
                  <NumberInputRight
                    name="impedance"
                    value={formData['impedance'] || 0}
                    onChange={(value) => handleChange({ target: { name: 'impedance', value } })}
                    rightText={'Ω'}
                  />
                </Flex>
                <Flex direction={isDesktop ? 'row' : 'column'} alignItems={`${isDesktop ? 'center' : 'flex-start'}`} justifyContent='space-between'>
                  <FormLabel mb={isDesktop ? 0 : 4}>Protection</FormLabel>
                  <Stack flexBasis='70%' direction='row' justifyContent='space-between'>
                    <Input
                      type='text'
                      name='protection_summary'
                      placeholder=''
                      value={formData['protection_summary'] || ''}
                      onChange={handleChange}
                      borderRadius={0}
                    />
                    <Button bgColor='gray.600' borderRadius={100} onClick={openProtectionLinkModal}>
                      Edit
                    </Button>
                  </Stack>
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
      <VoltDropModal
        isOpen={isVoltDropModalOpen}
        onClose={closeVoltDropModal}
        onReturn={handleReturnToSource}
        setFormData={setFormData}
        formData={formData}
      />
      <ProtectionLinkModal
        isOpen={isProtectionLinkModalOpen}
        onClose={closeProtectionLinkModal}
        onSave={handleSaveProtectionLink}
        initialLink={protectionLink}
      />
    </>
  );
}
