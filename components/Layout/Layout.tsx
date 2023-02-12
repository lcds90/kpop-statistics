import styled from "styled-components";
import { Breakpoints, MOVE_BG } from "tokens";

export const Layout = styled.div.attrs((props: LayoutProps) => ({
  ...props,
  hasBackground: props.hasBackground || false,
}))`
  display: grid;
  max-width: 100%;

  ${({ hasBackground, theme: { colors } }) =>
    hasBackground &&
    `background: linear-gradient(0deg, ${colors.primary} 60%, ${colors.secondary} 80%);`}

  width: ${({ isMaxWidth }) => (isMaxWidth ? "100vw" : "100%")};
  max-height: ${({ isMaxHeight }) => (isMaxHeight ? "100vh" : "100%")};
  grid: ${({ grid: { mobile: grid } }) =>
    `${grid.rows.join(" ")} / ${grid.columns.join(" ")}`};

  animation: ${MOVE_BG} 20s linear infinite;
  @media (min-width: ${Breakpoints.TABLET}) {
    grid: ${({ grid: { tablet: grid } }) =>
      `${grid.rows.join(" ")} / ${grid.columns.join(" ")}`};
    overflow: hidden;
  }
  `; 

