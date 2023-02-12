import { keyframes } from 'styled-components';

export const MOVE_BG = keyframes`
0% {
  background-position: 0% -1000%;
}
25% {
  background-position: 0% 100%;
}
50% {
  background-position: 0% 0%;
}
75% {
  background-position: 0% -100%;
}
100% {
  background-position: 0% -1000%;
}
`;