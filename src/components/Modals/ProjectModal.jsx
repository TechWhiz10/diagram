import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Input,
  Select
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addProject } from '../../store/slices/dataSlice'; // Adjust import path as necessary

export default function ProjectModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.data.folders); // Adjust based on your Redux state structure
  const [projectName, setProjectName] = React.useState('');
  const [selectedFolder, setSelectedFolder] = React.useState('');

  const handleCreateProject = () => {
    if (projectName && selectedFolder) {
      // Create a new project object
      const newProject = {
        id: Date.now(), // Simple unique ID based on timestamp
        title: projectName,
        folderId: selectedFolder,
        updatedAt: new Date().toLocaleDateString()
      };

      // Dispatch action to add the new project to Redux store
      dispatch(addProject(newProject));
      setProjectName('');
      setSelectedFolder('');
      onClose(); // Close the modal after adding the project
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='white' bgColor='blue.400'>
          New Project
        </ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody>
          <Input
            borderRadius={0}
            my={2}
            placeholder='Project Name'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Select
            borderRadius={0}
            placeholder='Select Folder'
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.title}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor='blue.550'
            borderRadius={100}
            onClick={handleCreateProject}
            disabled={!projectName || !selectedFolder} // Disable button if form is incomplete
          >
            Create Project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
