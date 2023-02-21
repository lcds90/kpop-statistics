import styled from "styled-components";

export const Info = styled.section`
  display: grid;
  max-height: 50vh;
  overflow: auto;
  padding: 2rem;
  line-height: 2rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
  color: whitesmoke;
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);

  ul {
    list-style: none;
  }
`;
