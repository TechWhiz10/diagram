import * as React from "react"
import styled from "styled-components"

const PortDefaultInner = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: cornflowerblue;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: cornflowerblue;
  }
  & svg {
    width: 15px;
    height: 15px;
  }
`

export const PortDefault = () => <PortDefaultInner />
