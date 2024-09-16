import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Input
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addFolder } from '../../store/slices/dataSlice';

export default function FolderModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [folderName, setFolderName] = useState('');

  const handleCreateFolder = () => {
    // Create a new folder object with a unique ID
    const newFolder = {
      id: Date.now(), // Simple unique ID based on timestamp
      title: folderName,
      files: 0,
      updatedAt: new Date().toLocaleDateString()
    };

    // Dispatch action to add the new folder to Redux store
    dispatch(addFolder(newFolder));
    setFolderName('');
    onClose(); // Close the modal after adding the folder
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='white' bgColor='blue.400'>
          New Folder
        </ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody>
          <Input
            borderRadius={0}
            my={2}
            placeholder='Folder Name'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </ModalBody>

        <ModalFooter borderRadius={0}>
          <Button
            bgColor='blue.550'
            borderRadius={100}
            onClick={handleCreateFolder}
            disabled={!folderName} // Disable button if folder name is empty
          >
            Create Folder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
