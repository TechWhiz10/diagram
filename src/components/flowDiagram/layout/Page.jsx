import * as React from "react"
import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    overflow: hidden;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  *, :after, :before {
    box-sizing: inherit;
  }
`

const PageContent = styled.div`
`

export const Page = ({ children }) => (
  <PageContent>
    {children}
    <GlobalStyle />
  </PageContent>
)
