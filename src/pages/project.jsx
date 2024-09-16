import React, { useState } from 'react';
import {
  Button,
  Flex,
  Box,
  useBreakpointValue,
  useDisclosure,
  Text,
  IconButton,
} from '@chakra-ui/react';

import {
  AddIcon,
  MinusIcon
} from '@chakra-ui/icons';

import DraggableBox from '../components/DraggableBox';
import SourceModal from '../components/Modals/SourceModal';
import LoadModal from '../components/Modals/LoadModal';


const Wire = ({ fromBox, toBox }) => {
  const x1 = fromBox.position.x + fromBox.w / 2;
  const y1 = fromBox.position.y + fromBox.h;
  const x2 = toBox.position.x + toBox.w / 2;
  const y2 = toBox.position.y;

  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function ProjectPage() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { isOpen: isSourceOpen, onOpen: onSourceOpen, onClose: onSourceClose } = useDisclosure();
  const { isOpen: isLoadOpen, onOpen: onLoadOpen, onClose: onLoadClose } = useDisclosure();

  const btnPx = isDesktop ? 8 : 4;

  const [boxes, setBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [zoom, setZoom] = useState(100); // Zoom state in percentage
  const [connections, setConnections] = useState([]);

  const handleDrag = (e, data, id) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id
          ? {
            ...box,
            position: {
              x: Math.min(Math.max(0, data.x), 700 - box.w),
              y: Math.min(Math.max(0, data.y), 500 - box.h),
            },
          }
          : box
      )
    );
  };

  const handleStop = (e, data, id) => {
    handleDrag(e, data, id);
  };

  const addBox = (type) => {
    const newId = `${type}-${boxes.filter((box) => box.type === type).length + 1}`;

    const boxContent = (
      <Box fontSize="md">
        {newId}
        {type === 'Load' && (
          <>
            <br />
            <Text fontSize="sm" color="gray.600">Sockets</Text>
          </>
        )}
      </Box>
    );

    const newBox = {
      id: newId,
      children: boxContent,
      position: { x: 50, y: 50 },
      w: type === 'DB' ? 320 : 145,
      type,
      h: 70,
      data: {}, // Initial empty data
    };

    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  const deleteBox = () => {
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== selectedBox.id));
    onSourceClose();
    onLoadClose();
  };

  const openModal = (box) => {
    setSelectedBox(box);
    if (box.type === 'SRC') onSourceOpen();
    if (box.type === 'Load') onLoadOpen();
  };

  const handleSave = (updatedData) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === selectedBox.id ? { ...box, data: updatedData } : box
      )
    );
    onLoadClose();
    onSourceClose();
  };

  // Zoom In/Out Handlers
  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 10, 200)); // Max 200%
  }
  const zoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 10, 50)); // Min 50%

  return (
    <Flex direction="column" alignItems="center">
      {/* Zoom Controls */}


      {/* Drawing Area Wrapper */}
      <Box
        position="relative"
        height={'75vh'}
        width="full"
        bgColor="white"
        overflow="hidden"  // Ensure no overflow on outer container
        rounded="md"
        shadow="sm"
        border="1px"
        borderColor="gray.300"
      >
        <Flex position="absolute" border='1px' borderColor='gray.300' shadow='sm' bgColor='gray.100' p={1} rounded='md' zIndex={2} top={2} gap={2} right={2} alignItems='center'>
          <MinusIcon onClick={zoomOut} />
          <Text fontSize="md">{zoom}%</Text>
          <AddIcon onClick={zoomIn} />
        </Flex>
        {/* Inner Zoomable Container */}
        <Box
          transform={`scale(${zoom / 100})`}  // Apply zoom
          transformOrigin="top left"  // Make sure it zooms from the top-left corner
          width="100%"  // Maintain full width for scaling effect
          height="100%"  // Maintain full height for scaling effect
          overflow="auto"  // Allow panning/scrolling if content overflows
        >
          {boxes.map((box, index) => (
            <Box key={index} onClick={() => openModal(box)}>
              <DraggableBox
                id={box.id}
                width={box.w}
                height={box.h}
                position={box.position}
                onDrag={(e, data) => handleDrag(e, data, box.id)}a
                onStop={(e, data) => handleStop(e, data, box.id)}
              >
                {box.children}
              </DraggableBox>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Buttons Section */}
      <Box mt={4} textAlign="center">
        <Box mx="auto" borderRadius="full" display="inline-block" p={2} bgColor="white">
          <Button borderRadius="full" px={btnPx} onClick={() => addBox('SRC')}>Source</Button>
          <Button borderRadius="full" px={btnPx} ml={2} variant="outline" onClick={() => addBox('DB')}>DB</Button>
          <Button borderRadius="full" px={btnPx} ml={2} variant="outline" onClick={() => addBox('Load')}>Load</Button>
        </Box>
      </Box>

      {/* Modals */}
      {selectedBox?.type === 'SRC' && (
        <SourceModal
          isOpen={isSourceOpen}
          onClose={onSourceClose}
          boxData={selectedBox.data}
          onSave={handleSave}
          onDelete={deleteBox}
        />
      )}
      {selectedBox?.type === 'Load' && (
        <LoadModal
          isOpen={isLoadOpen}
          onClose={onLoadClose}
          boxData={selectedBox.data}
          onSave={handleSave}
          onDelete={deleteBox}
        />
      )}
    </Flex>
  );
}
