import styled from "styled-components";
import ButtonAtom from "../Atoms/Button";

const StyledButton = styled(ButtonAtom)`
  background-color: #2303a6;
  color: #fff;
  font-size: 14px;
  padding: 12px 45px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, background-color 0.3s ease;

  &:hover {
    background-color: #1c2971;
    transform: scale(1.05);
  }
`;

const AuthButton = ({ text,type, onClick }) => {
  return <StyledButton type={type} onClick={onClick}>{text}</StyledButton>;
};


export default AuthButton;
