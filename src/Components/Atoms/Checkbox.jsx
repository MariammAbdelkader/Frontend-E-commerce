import styled from "styled-components";

const StyledCheckbox = styled.input`
  width: ${(props) => props.size || "16px"};
  height: ${(props) => props.size || "16px"};
  accent-color: ${(props) => props.color || "#007bff"};
  margin-right: ${(props) => props.margin || "5px"};
`;

const CheckboxAtom = ({ checked, onChange, ...styles }) => {
  return <StyledCheckbox type="checkbox" checked={checked} onChange={onChange} {...styles} />;
};

export default CheckboxAtom;
//<CheckboxAtom checked={true} color="red" />
