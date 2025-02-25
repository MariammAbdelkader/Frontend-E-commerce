import styled from "styled-components";
import InputAtom from "../Atoms/Input";
import IconAtom from "../Atoms/Icon";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.bg || "#f6f6f6"};
  padding: ${(props) => props.padding || "5px"};
  border-radius: ${(props) => props.radius || "8px"};
  margin: ${(props) => props.margin || "10px 0"};
  width: ${(props) => props.width || "100%"};
  border: ${(props) => props.border || "none"};
`;

const InputField = ({ icon, placeholder, type, inputStyles, wrapperStyles }) => {
  return (
    <InputWrapper {...wrapperStyles}>
      {icon && <IconAtom name={icon} />}
      <InputAtom type={type} placeholder={placeholder} {...inputStyles} />
    </InputWrapper>
  );
};

export default InputField;
