import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Box } from '@chakra-ui/react';

const DraggableBox = ({ id, position, onDrag, onStop, width, height, children }) => {
  // Create a ref to be attached to the draggable element
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef} // Use nodeRef to avoid findDOMNode
      defaultPosition={position}
      onDrag={onDrag}
      onStop={onStop}
    >
      {/* Attach the ref to the Box component */}
      <Box
        ref={nodeRef} // Attach the ref here
        id={id}
        width={`${width}px`}
        height={`${height}px`}
        bg="lightblue"
        borderWidth="1px"
        borderColor="gray.500"
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="move"
        borderRadius={0}
        p={2}
        overflow="hidden"
      >
        {children}
      </Box>
    </Draggable>
  );
};

export default DraggableBox;
