import React, { useState, useCallback } from 'react';
import { Button, Flex, Box, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import SourceModal from '../components/Modals/SourceModal'; // Ensure the path is correct
import LoadModal from '../components/Modals/LoadModal'; // Ensure the path is correct
import CircuitDiagram from '../components/CircuitDiagram'; // Ensure the path is correct

export default function ProjectPage() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { isOpen: isSourceOpen, onOpen: onSourceOpen, onClose: onSourceClose } = useDisclosure();
  const { isOpen: isLoadOpen, onOpen: onLoadOpen, onClose: onLoadClose } = useDisclosure();

  const btnPx = isDesktop ? 8 : 4;

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);

  const addBox = useCallback((type) => {
    const newId = `${type}-${nodes.filter((node) => node.key.startsWith(type)).length + 1}`;
    
    const newNode = {
      key: newId,
      width: type === 'DB' ? 320 : 150,
      pos: '0 0',
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [nodes]);

  const openModal = (node) => {
    setSelectedBox(node);
    if (node.key.startsWith('SRC')) onSourceOpen();
    if (node.key.startsWith('Load')) onLoadOpen();
  };

  const handleSave = (updatedData) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.key === selectedBox.key ? { ...node, ...updatedData } : node
      )
    );
    onLoadClose();
    onSourceClose();
  };

  const deleteBox = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.key !== selectedBox.key));
    onSourceClose();
    onLoadClose();
  };

  const handleNodeDoubleClick = (nodeData) => {
    openModal(nodeData);
  };

  return (
    <Flex direction="column" alignItems="center">
      <Box
        position="relative"
        height={'75vh'}
        width="full"
        bgColor="white"
        overflow="hidden"
        rounded="md"
        shadow="sm"
        border="1px"
        borderColor="gray.300"
      >
        <CircuitDiagram
          nodes={nodes}
          links={links}
          onNodeDoubleClick={handleNodeDoubleClick}
        />
      </Box>

      <Box mt={4} textAlign="center">
        <Box mx="auto" borderRadius="full" display="inline-block" p={2} bgColor="white">
          <Button borderRadius="full" px={btnPx} onClick={() => addBox('SRC')}>Source</Button>
          <Button borderRadius="full" px={btnPx} ml={2} variant="outline" onClick={() => addBox('DB')}>DB</Button>
          <Button borderRadius="full" px={btnPx} ml={2} variant="outline" onClick={() => addBox('Load')}>Load</Button>
        </Box>
      </Box>

      {selectedBox?.key.startsWith('SRC') && (
        <SourceModal
          isOpen={isSourceOpen}
          onClose={onSourceClose}
          boxData={selectedBox}
          onSave={handleSave}
          onDelete={deleteBox}
        />
      )}
      {selectedBox?.key.startsWith('Load') && (
        <LoadModal
          isOpen={isLoadOpen}
          onClose={onLoadClose}
          boxData={selectedBox}
          onSave={handleSave}
          onDelete={deleteBox}
        />
      )}
    </Flex>
  );
}
