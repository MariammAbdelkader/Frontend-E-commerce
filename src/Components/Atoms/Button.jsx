import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  padding: ${({ padding }) => padding};
  border: none;
  border-radius: ${({ radius }) => radius};
  font-size: ${({ fontSize }) => fontSize};
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

const ButtonAtom = ({ children, onClick, type = "button", ...styles }) => {
  return (
    <StyledButton onClick={onClick} type={type} {...styles}>
      {children}
    </StyledButton>
  );
};

export default ButtonAtom;
