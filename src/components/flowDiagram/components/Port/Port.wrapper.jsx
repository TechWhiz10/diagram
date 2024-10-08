import { isEqual } from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { v4 } from "uuid"
import CanvasContext from "../Canvas/CanvasContext"
import { PortDefault } from "./Port.default"

/** Construct the composed path by traversing parentElements */
const composedPath = el => {
  const path = []
  while (el) {
    path.push(el)
    el = el.parentElement
  }
  return path
}

export class PortWrapper extends React.Component {
  static contextType = CanvasContext

  nodeRef = React.createRef()

  componentDidUpdate(prevProps) {
    // Update port position after a re-render if node.size has changed
    if (!isEqual(this.props.node.size, prevProps.node.size)) {
      const el = ReactDOM.findDOMNode(this.nodeRef.current)
      if (el) {
        // Ports component should be positions absolute
        // Factor this in so we get position relative to the node
        const nodesEl = el.parentElement
          ? el.parentElement
          : { offsetLeft: 0, offsetTop: 0 }
        // update port position after node size has been determined
        this.props.onPortPositionChange({
          config: this.props.config,
          node: this.props.node,
          port: this.props.port,
          el,
          nodesEl
        })
      }
    }
  }

  onMouseDown = startEvent => {
    const {
      offset,
      node,
      port,
      onLinkStart,
      onLinkCancel,
      onLinkComplete,
      onLinkMove,
      config
    } = this.props
    const linkId = v4()
    const fromNodeId = node.id
    const fromPortId = port.id

    // Create the move handler
    // This will update the position as the mouse moves
    const mouseMoveHandler = e => {
      const { offsetX, offsetY } = this.context

      onLinkMove({
        config,
        linkId,
        startEvent,
        fromNodeId,
        fromPortId,
        toPosition: {
          x: e.clientX - offsetX - offset.x,
          y: e.clientY - offsetY - offset.y
        }
      })
    }

    // Create and bind the mouse up handler
    // This is used to check if the link is complete or cancelled
    const mouseUpHandler = e => {
      // We traverse up the event path until we find an element with 'data-port-id' and data-node-id'
      // e.toElement cannot be used because it may be a child element of the port
      const path = composedPath(e.target)
      const portEl = path.find(el => {
        const toPortId = el.getAttribute && el.getAttribute("data-port-id")
        const toNodeId = el.getAttribute && el.getAttribute("data-node-id")
        return !!(toPortId && toNodeId)
      })

      // If both node-id and port-id are defined as data attributes, we are mouse-upping
      // on another port. Run the success handler
      if (portEl) {
        const toPortId = portEl.getAttribute("data-port-id")
        const toNodeId = portEl.getAttribute("data-node-id")
        onLinkComplete({
          config,
          linkId,
          startEvent,
          fromNodeId,
          fromPortId,
          toNodeId,
          toPortId
        })
      } else {
        onLinkCancel({ config, linkId, startEvent, fromNodeId, fromPortId })
      }

      // Remove the listeners if the link is complete or canceled
      window.removeEventListener("mouseup", mouseUpHandler, false)
      window.removeEventListener("mousemove", mouseMoveHandler, false)
    }

    // Add listeners
    window.addEventListener("mouseup", mouseUpHandler, false)
    window.addEventListener("mousemove", mouseMoveHandler, false)

    // Notify state of link start
    onLinkStart({ config, linkId, startEvent, fromNodeId, fromPortId })

    // Prevent default and stop propagation to prevent text selection
    startEvent.preventDefault()
    startEvent.stopPropagation()
  }
  render() {
    const {
      selected,
      selectedLink,
      hovered,
      hoveredLink,
      style,
      port,
      node,
      Component = PortDefault,
      config
    } = this.props

    return (
      <div
        className="Allen"
        data-port-id={port.id}
        data-node-id={node.id}
        onMouseDown={this.onMouseDown}
        ref={this.nodeRef}
        style={style}
      >
        <Component
          config={config}
          port={port}
          isSelected={
            !!selected && selected.type === "port" && selected.id === port.id
          }
          isHovered={
            !!hovered && hovered.type === "port" && hovered.id === port.id
          }
          isLinkSelected={
            selectedLink
              ? (selectedLink.from.portId === port.id &&
                  selectedLink.from.nodeId === node.id) ||
                (selectedLink.to.portId === port.id &&
                  selectedLink.to.nodeId === node.id)
              : false
          }
          isLinkHovered={
            hoveredLink
              ? (hoveredLink.from.portId === port.id &&
                  hoveredLink.from.nodeId === node.id) ||
                (hoveredLink.to.portId === port.id &&
                  hoveredLink.to.nodeId === node.id)
              : false
          }
        />
      </div>
    )
  }
}
