// 📂 components/pages/SignupPage.jsx
import styled from "styled-components";
import SignupForm from "../Organisms/SignupForm";
import AuthSidePanel from "../Organisms/AuthSidePanel";

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* يجعل الصفحة وسط الشاشة */
  background-color: #f5f5f5;
`;

export const FormContainer = styled.div`
  background: #fff;
  width: 900px;  /* عرض ثابت */
  height: 550px; /* ارتفاع ثابت يمنع التمدد */
  display: flex;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const SignupWrapper = styled.div`
display: flex;
width: 60%;
max-width: 900px;
background: white;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 20px;
overflow: hidden;
position: relative;
`;


export const LeftPanel = styled.div`
  flex: 1;
  background: #0a0080;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const RightPanel = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto; /* تفعيل السكروول عند الحاجة */
  max-height: 500px; /* تحديد ارتفاع معين */
  scrollbar-width: thin; /* تقليل حجم السكروول */
`;


const SignupPage = ({ formData, handleChange, passwordMismatch,handleSubmit, loading, error, success }) => {
  return (
    <PageContainer>
      <SignupWrapper>
        <LeftPanel>
          <AuthSidePanel
            title="Welcome, Friend!"
            text="Already have Acount?"
            buttonText="SIGN IN"
          />
        </LeftPanel>
        <RightPanel>

            <SignupForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
                success={success}
                passwordMismatch={passwordMismatch}
            />
            
        </RightPanel>
      </SignupWrapper>
    </PageContainer>
  );
};

export default SignupPage;

