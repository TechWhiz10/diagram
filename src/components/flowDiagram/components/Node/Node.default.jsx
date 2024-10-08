import * as React from "react"
import styled, { css } from "styled-components"

const StartPoint = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(148, 80, 81);
  color: white;
  border-radius: 50%;
  ${props =>
    props.isSelected &&
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      margin-top: -2px;
    `}
`

const EndPoint = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(110, 97, 107);
  color: white;
  border-radius: 50%;
  ${props =>
    props.isSelected &&
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      margin-top: -2px;
    `}
`

const ProcessQueue = styled.div`
  width: 200px;
  height: 120px;
  position: absolute;
  padding: 30px;
  background: rgb(217, 207, 138);
  color: white;
  border-radius: 10px;
  & div {
    padding: 0px;
    margin: 0px;
  }
  ${props =>
    props.isSelected &&
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      margin-top: -2px;
    `}
`

const ProcessPoint = styled.div`
  width: 200px;
  height: 120px;
  position: absolute;
  padding: 30px;
  background: rgb(155, 127, 105);
  color: white;
  & div {
    padding: 0px;
    margin: 0px;
  }
  ${props =>
    props.isSelected &&
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      margin-top: -2px;
    `}
`

export const NodeDefault = React.forwardRef(
  ({ node, children, ...otherProps }, ref) => {
    switch (node.type) {
      case "start":
        return (
          <StartPoint ref={ref} {...otherProps}>
            {children}
          </StartPoint>
        )
      case "end":
        return (
          <EndPoint ref={ref} {...otherProps}>
            {children}
          </EndPoint>
        )
      case "process-queue":
        return (
          <ProcessQueue ref={ref} {...otherProps}>
            {children}
          </ProcessQueue>
        )
      case "process-point":
        return (
          <ProcessPoint ref={ref} {...otherProps}>
            {children}
          </ProcessPoint>
        )
    }
    return (
      <StartPoint ref={ref} {...otherProps}>
        {children}
      </StartPoint>
    )
  }
)
