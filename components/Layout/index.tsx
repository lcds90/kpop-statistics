import styled from "styled-components";
import { Breakpoints, MOVE_BG } from "@constants";

export const Layout = styled.div`
  background: ${({ theme: { colors } }) =>
    `linear-gradient(0deg, ${colors.primary} 60%, ${colors.secondary} 80%)`};
  width: 100vw;
  max-height: 100vh;
  max-width: 100%;
  display: grid;
  grid: max-content 1fr / 1fr;

  animation: ${MOVE_BG} 20s linear infinite;
  @media (min-width: ${Breakpoints.TABLET}) {
    grid: 1fr / 1fr 3fr;
    overflow: hidden;
  }
`;

export const Main = styled.main`
  display: grid;
  grid: 1fr / 1fr;
  overflow: hidden;
  @media (min-width: ${Breakpoints.TABLET}) {
    grid: 0.25fr 1fr / 1fr;
    overflow: hidden;
  }
`;

