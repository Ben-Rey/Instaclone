import { Card } from "grommet";
import styled from "styled-components";

const CardConcave = styled(Card)`
  background: #292929;
  box-shadow: inset 5px 5px 10px #1b1b1b, inset -5px -5px 10px #373737;
  box-sizing: border-box;
  hoverflow: scroll;
  min-height: 100px;
  color: white;
  :hover {
    background: rgb(222, 105, 7);
    background: linear-gradient(
      90deg,
      rgba(222, 105, 7, 1) 0%,
      rgb(210 66 11) 62%
    );
    box-shadow: inset 5px 5px 10px #780000, inset -5px -5px 10px #ff0000;
  }
`;

export default CardConcave;
