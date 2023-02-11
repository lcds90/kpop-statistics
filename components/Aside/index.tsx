import styled from "styled-components";

const Aside = styled.aside`
  background: var(--background);
  display: grid;
  place-items: center;
  color: var(--secondary);
  font-style: italic;
  font-weight: 400;
  padding: 2rem;
  max-height: 100vh;

  h2 {
    font-size: 2.4rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
`;
export default Aside;
