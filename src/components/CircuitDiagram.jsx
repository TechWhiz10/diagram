import React, { useRef, useEffect } from 'react';
import * as go from 'gojs';
import { Box } from '@chakra-ui/react';

function CircuitDiagram({ nodes, links, onNodeDoubleClick }) {
  const diagramRef = useRef(null);
  const diagram = useRef(null); // Reference for the GoJS diagram instance

  useEffect(() => {
    const $ = go.GraphObject.make;
    diagram.current = $(go.Diagram, diagramRef.current, {
      'undoManager.isEnabled': true,
      'animationManager.isEnabled': false,
      'linkingTool.isEnabled': true,
      'linkingTool.direction': go.LinkingTool.ForwardsOnly,
      'draggingTool.dragsLink': true,
      'rotatingTool.snapAngleMultiple': 15,
      'toolManager.hoverDelay': 10000,
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
      'clickCreatingTool.insertPart': true,
      'grid.visible': false, // Hide grid
    });

    diagram.current.nodeTemplate = $(go.Node, 'Spot', {
      doubleClick: (e, node) => {
        const data = node.data;
        onNodeDoubleClick(data);
      }
    },
      $(go.Panel, 'Auto',
        $(go.Shape, {
          name: 'SHAPE',
          strokeWidth: 2,
          stroke: '#00074A',
          fill: '#EBF9FF',
          width: 150,
          height: 75,
        }).bind('width').bind('height'),
        $(go.TextBlock, {
          font: 'bold 13px InterVariable, sans-serif',
          stroke: 'black'
        }).bind('text', 'key').bind('location', 'pos', go.Point.parse, go.Point.stringify)
      ),
      makePort('T', go.Spot.Top, go.Spot.Top, true, true),
      makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, true),
      makePort('R', go.Spot.Right, go.Spot.Right, true, true),
      makePort('L', go.Spot.Left, go.Spot.Left, true, true),
    );

    diagram.current.linkTemplate = $(go.Link,
      {
        routing: go.Routing.AvoidsNodes,
        corner: 0,
        layerName: 'Background',
        toShortLength: 3
      },
      $(go.Shape, { strokeWidth: 2, stroke: 'black' }),
      $(go.Shape, { toArrow: 'Line', stroke: null })
    );

    function makePort(name, align, spot, output, input, offset = new go.Size(0, 0)) {
      return go.GraphObject.make(go.Shape, 'Circle', {
        alignment: align,
        portId: name,
        fromSpot: spot,
        toSpot: spot,
        fromLinkable: output,
        toLinkable: input,
        cursor: 'pointer',
        fill: '#EE8000',
        stroke: null,
        desiredSize: new go.Size(8, 8),
        alignmentFocus: new go.Spot(0.5, 0.5, offset.width, offset.height)
      });
    }

    // Clean up the diagram when the component unmounts
    return () => {
      if (diagram.current) {
        diagram.current.div = null;
      }
    };
  }, [onNodeDoubleClick]);

  useEffect(() => {
    if (diagram.current) {
      diagram.current.model = new go.GraphLinksModel(nodes, links);
    }
  }, [nodes, links]);

  return (
    <Box ref={diagramRef} width="100%" height="100%" bg="white" />
  );
}

export default CircuitDiagram;
