import styled from "styled-components";
import LoginForm from "../Organisms/LoginForm";
import AuthSidePanel from "../Organisms/AuthSidePanel";

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* يجعل الصفحة وسط الشاشة */
  background-color: #f5f5f5;
;`

export const FormContainer = styled.div`
  background: #fff;
  width: 900px;  /* عرض ثابت */
  height: 550px; /* ارتفاع ثابت يمنع التمدد */
  display: flex;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
export const SigninWrapper = styled.div`
display: flex;
width: 60%;
max-width: 900px;
background: white;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 20px;
overflow: hidden;
position: relative;`;

export const LeftPanel = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  `
;

export const RightPanel = styled.div`
  flex: 1;
  background: #0a0080;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;`
;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background: #f0f0f0;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background: #10069f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0a045e;
  }`
;



const LoginPage = () => {
    return (
      <PageContainer>
        <FormContainer>
          <LeftPanel>
            <LoginForm />
          </LeftPanel>
  
          <RightPanel>
          <AuthSidePanel
            title="Hello, Friend!"
            text="Create New Account?"
            buttonText="SIGN UP"
          />
          </RightPanel>
        </FormContainer>
      </PageContainer>
    );
  };
  
  export default LoginPage;
  
