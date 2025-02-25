import styled from "styled-components";
import InputField from "../Molecules/InputField";
import AuthButton from "../Molecules/AthunButton";

const FormContainer = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-height: 400px; 
  
`;

const Title = styled.h2`
  color: #2303a6;
  font-size: 24px;
  margin-bottom: 20px;
`;

const ForgotPassword = styled.a`
  color: #666;
  font-size: 14px;
  text-decoration: none;
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  const handleSubmit = () => {
    console.log("Login submitted!");
  };

  return (
    <FormContainer>
      <Title>Sign In</Title>
      <InputField icon="fas fa-envelope" placeholder="Email Address" type="email" />
      <InputField icon="fas fa-lock" placeholder="Password" type="password" />
      <ForgotPassword href="#">Forgot Your Password?</ForgotPassword>
      <AuthButton text="Sign In" onClick={handleSubmit} />
    </FormContainer>
  );
};

export default LoginForm;
