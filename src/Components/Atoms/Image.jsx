// 📂 components/atoms/Icon.jsx
import styled from "styled-components";

const StyledIcon = styled.i`
  font-size: ${(props) => props.size || "24px"};
  color: ${(props) => props.color || "#333"};
  margin: ${(props) => props.margin || "0"};
`;

const IconAtom = ({ name, ...styles }) => {
  return <StyledIcon className={name} {...styles}></StyledIcon>;
};

export default IconAtom;
//<IconAtom name="fas fa-shopping-cart" color="blue" size="30px" />
