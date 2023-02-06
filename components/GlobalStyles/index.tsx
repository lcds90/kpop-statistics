import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0;
}

/* A cada 1rem será considerada 10px */
html {
  font-size: 62.5%;
  font-family: 'Zen Kaku Gothic Antique', sans-serif;
}

body {
  font-size: 1.6rem;
}

:root {
  ${({ theme: { colors } }) => `
    --background: ${colors.background};
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
  `}

}

`

export default GlobalStyle