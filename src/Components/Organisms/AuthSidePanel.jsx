// 📂 components/organisms/AuthSidePanel.jsx
import styled from "styled-components";
import AuthButton from "../Molecules/AthunButton";

const PanelContainer = styled.div`
  background: #0a0080;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
  border-radius: 0 10px 10px 0;
  flex: 1;
`;

const AuthSidePanel = ({ title, text, buttonText }) => {
  return (
    <PanelContainer>
      <h2>{title}</h2>
      <p>{text}</p>
      <AuthButton text={buttonText} />
    </PanelContainer>
  );
};

export default AuthSidePanel;
