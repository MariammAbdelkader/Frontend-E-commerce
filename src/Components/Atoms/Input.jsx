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

const InputAtom = ({ type = "text", placeholder, ...styles }) => {
  return <StyledInput type={type} placeholder={placeholder} {...styles} />;
};

export default InputAtom;
