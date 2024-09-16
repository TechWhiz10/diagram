import * as React from "react"
import Draggable from "react-draggable"
import { REACT_FLOW_CHART } from "../.."
import CanvasContext from "./CanvasContext"

export class CanvasWrapper extends React.Component {
  state = {
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0
  }

  ref = React.createRef()

  componentDidMount() {
    this.updateSize()

    if (this.ref.current) {
      if (window.ResizeObserver) {
        const ro = new window.ResizeObserver(this.updateSize)
        ro.observe(this.ref.current)
      } else {
        window.addEventListener("resize", this.updateSize)
      }
      window.addEventListener("scroll", this.updateSize)
    }
  }

  componentDidUpdate() {
    this.updateSize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize)
    window.removeEventListener("scroll", this.updateSize)
  }

  render() {
    const {
      config,
      ComponentInner,
      ComponentOuter,
      position,
      onDragCanvas,
      children,
      onCanvasClick,
      onDeleteKey,
      onCanvasDrop
    } = this.props
    const { offsetX, offsetY } = this.state
    return (
      <CanvasContext.Provider
        value={{ offsetX: this.state.offsetX, offsetY: this.state.offsetY }}
      >
        <ComponentOuter config={config} ref={this.ref}>
          <Draggable
            axis="both"
            position={position}
            grid={[1, 1]}
            onDrag={(event, data) => onDragCanvas({ config, event, data })}
            disabled={config.readonly}
          >
            <ComponentInner
              config={config}
              children={children}
              onClick={onCanvasClick}
              tabIndex={0}
              onKeyDown={e => {
                // delete or backspace keys
                if (e.keyCode === 46 || e.keyCode === 8) {
                  onDeleteKey({ config })
                }
              }}
              onDrop={e => {
                const data = JSON.parse(
                  e.dataTransfer.getData(REACT_FLOW_CHART)
                )
                if (data) {
                  onCanvasDrop({
                    data,
                    position: {
                      x: e.clientX - (position.x + offsetX),
                      y: e.clientY - (position.y + offsetY)
                    }
                  })
                }
              }}
              onDragOver={e => e.preventDefault()}
            />
          </Draggable>
        </ComponentOuter>
      </CanvasContext.Provider>
    )
  }

  updateSize = () => {
    const el = this.ref.current

    if (el) {
      const rect = el.getBoundingClientRect()

      if (
        el.offsetWidth !== this.state.width ||
        el.offsetHeight !== this.state.height
      ) {
        this.setState({ width: el.offsetWidth, height: el.offsetHeight })
        this.props.onSizeChange(el.offsetWidth, el.offsetHeight)
      }

      if (rect.left !== this.state.offsetX || rect.top !== this.state.offsetY) {
        this.setState({ offsetX: rect.left, offsetY: rect.top })
      }
    }
  }
}
