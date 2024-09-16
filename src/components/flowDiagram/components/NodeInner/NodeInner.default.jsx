import * as React from "react"
import styled from "styled-components"

const Outer = styled.div`
  padding: 30px;
`

export const NodeInnerDefault = ({ node }) => {
  return (
    <Outer>
      <p>
        {" "}
        {!!node.properties &&
          !!node.properties.name &&
          `${node.properties.name}`}{" "}
      </p>
      <p>
        {" "}
        {!!node.properties &&
          !!node.properties.Id &&
          `${node.properties.Id}`}{" "}
      </p>
    </Outer>
  )
}
