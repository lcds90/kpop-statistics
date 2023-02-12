import styled from "styled-components";
import { Breakpoints, MOVE_BG } from "tokens";

export const Layout = styled.div.attrs((props: LayoutProps) => ({
  ...props,
  hasBackground: props.hasBackground || false,
}))`
  max-width: 100%;

  ${({ hasBackground, theme: { colors } }) =>
    hasBackground &&
    `
    background: linear-gradient(0deg, ${colors.primary} 60%, ${colors.secondary} 80%);
    `}
  animation: ${MOVE_BG} 20s linear infinite;
  ${({ hasBackground }) => !hasBackground && "background: none;"}

  width: ${({ isMaxWidth }) => (isMaxWidth ? "100vw" : "100%")};
  max-height: ${({ isMaxHeight }) => (isMaxHeight ? "100vh" : "100%")};
  min-height: ${({ isMaxHeight }) => (isMaxHeight ? "100vh" : "100%")};

  ${({ padding }) => {
    if (padding) {
      if ([padding.mobile, padding.tablet].includes("small")) {
        return "padding: 2rem;";
      }
      if ([padding.mobile, padding.tablet].includes("medium")) {
        return "padding: 5rem;";
      }
    }
    return;
  }}

  ${({ gap }) => {
    if (gap) {
      if ([gap.mobile, gap.tablet].includes("small")) {
        return "gap: 2rem;";
      }
      if ([gap.mobile, gap.tablet].includes("medium")) {
        return "gap: 5rem;";
      }
    }
    return;
  }}

  ${({ flex }) => {
    if (flex) {
      return `display: flex;
      flex-direction: ${flex.direction || "row"};
      justify-content: ${flex.justify || "flex-start"};
      align-items: ${flex.align || "flex-start"};
      `;
    }
    return;
  }}

  ${({ grid }) => grid && "display: grid;"}

  ${({ grid }) =>
    grid && grid.autofit &&
    `grid-template-columns: repeat(auto-fit, minmax(${grid.autofit.minSize}, ${grid.autofit.maxSize}));`}

  ${({ grid }) =>
    grid && grid.mobile &&
    `grid: ${grid.mobile.rows.join(" ")} / ${grid.mobile.columns.join(" ")};`}

  @media (min-width: ${Breakpoints.TABLET}) {
    ${({ grid }) =>
      grid && grid.tablet &&
      `grid: ${grid.tablet.rows.join(" ")} / ${grid.tablet.columns.join(" ")};`}
    overflow: hidden;
  }
`;
