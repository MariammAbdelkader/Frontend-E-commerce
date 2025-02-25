import styled from "styled-components";

const StyledRadio = styled.input`
  width: ${(props) => props.size || "16px"};
  height: ${(props) => props.size || "16px"};
  accent-color: ${(props) => props.color || "#007bff"};
  margin-right: ${(props) => props.margin || "5px"};
`;

const RadioButtonAtom = ({ name, value, checked, onChange, ...styles }) => {
  return <StyledRadio type="radio" name={name} value={value} checked={checked} onChange={onChange} {...styles} />;
};

export default RadioButtonAtom;
//<RadioButtonAtom name="gender" value="male" checked={true} color="blue" />
