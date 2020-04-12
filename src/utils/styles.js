import styled from "styled-components"
import theme from "./theme"
import "normalize.css"

const Styles = styled.div`
  * {
    font-family: "Science Gothic", "Arial", sans-serif;
    color: inherit;
    text-decoration: inherit;
  }
  :root {
    font-size: 18px;
  }
  h1 {
    font-variation-settings: "wght" 765, "GRAD" 28, "wdth" 65, "slnt" 94,
      "opsz" 64;
  }
  background-color: ${theme.colorLight};
  cursor: none !important;
  a,
  img {
    cursor: none !important;
  }
  mark {
    background-color: ${theme.colorPrimaryLight};
  }
  p {
  }
`

export default Styles
