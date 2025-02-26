// 📂 components/atoms/Select.jsx
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  height: 40px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: white;
  outline: none;
  
  &:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 5px rgba(108, 99, 255, 0.5);
  }
`;

const SelectAtom = ({ options,onChange,name, ...props }) => {
  return (
    <StyledSelect {...props} name={name} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};


export default SelectAtom;
