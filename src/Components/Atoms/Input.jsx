import styled from "styled-components";

const StyledInput = styled.input`
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "10px"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.radius || "8px"};
  font-size: ${(props) => props.fontSize || "14px"};
  outline: none;
  background: ${(props) => props.bg || "#f6f6f6"};
  color: ${(props) => props.color || "#333"};

  &::placeholder {
    color: ${(props) => props.placeholderColor || "#aaa"};
  }
`;

const InputAtom = ({ name,type = "text", placeholder, value, onChange, ...styles }) => {
  return <StyledInput name={name} type={type} placeholder={placeholder} value={value}  onChange={onChange} {...styles} />;
};

export default InputAtom;
