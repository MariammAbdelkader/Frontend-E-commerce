import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: ${(props) => props.fontSize || "14px"};
  color: ${(props) => props.color || "#333"};
  margin-bottom: ${(props) => props.marginBottom || "5px"};
  display: block;
`;

const LabelAtom = ({ text, ...styles }) => {
  return <StyledLabel {...styles}>{text}</StyledLabel>;
};

export default LabelAtom;

//<LabelAtom text="Username:" fontSize="16px" color="blue" />
