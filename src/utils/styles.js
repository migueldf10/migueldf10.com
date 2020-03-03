import styled from "styled-components"
import theme from "./theme"

const Styles = styled.div`
  background-color: ${theme.colorLight};
  cursor: none !important;
  a,
  img {
    cursor: none !important;
  }
  mark {
    background-color: ${theme.colorPrimaryLight};
  }
`

export default Styles
