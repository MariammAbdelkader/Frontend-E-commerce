import styled from "styled-components";
import InputAtom from "../Atoms/Input";
import IconAtom from "../Atoms/Icon";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.$bg || "#f6f6f6"};
  padding: ${(props) => props.padding || "5px"};
  border-radius: ${(props) => props.radius || "8px"};
  margin: ${(props) => props.margin || "10px 0"};
  width: ${(props) => props.width || "100%"};
  border: ${(props) => props.border || "none"};
`;

const InputField = ({ icon, name, placeholder, type, inputStyles, wrapperStyles,onChange,value }) => {
  return (
    <InputWrapper {...wrapperStyles}>
      {icon && <IconAtom name={icon} />}
      <InputAtom name={name} type={type} placeholder={placeholder}  value={value}  onChange={onChange} {...inputStyles} />
    </InputWrapper>
  );
};

export default InputField;
