// 📂 components/atoms/Divider.jsx
import styled from "styled-components";

const StyledDivider = styled.hr`
  width: 100%;
  height: ${(props) => props.height || "1px"};
  background-color: ${(props) => props.color || "#ddd"};
  margin: ${(props) => props.margin || "10px 0"};
  border: none;
`;

const DividerAtom = ({ ...styles }) => {
  return <StyledDivider {...styles} />;
};

export default DividerAtom;
//<DividerAtom color="black" height="2px" />
