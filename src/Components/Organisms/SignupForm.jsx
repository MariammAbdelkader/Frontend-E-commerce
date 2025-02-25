import styled from "styled-components";
import InputField from "../Molecules/InputField";
import AuthButton from "../Molecules/AthunButton";
import SelectField from "../Molecules/SelectField";

import AuthFormLinks from "../Molecules/AthunFormLinks";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-height: 400px; /* عشان لو الفورم زادت تبدأ تظهر السكروول */

`;

const SignUpForm = () => {
  const handleSubmit = () => {
    console.log("Sign Up submitted!");
  };
  
  
  return (
    <FormContainer>
      <h2>Create Account</h2>
      <InputField icon="fas fa-user" placeholder="First Name" type="text" />
      <InputField icon="fas fa-user" placeholder="Last Name" type="text" />
      <InputField icon="fas fa-envelope" placeholder="Email Address" type="email" />
      <InputField icon="fas fa-lock" placeholder="Password" type="password" />
      <InputField icon="fas fa-lock" placeholder="Confirm Password" type="password" />
      <InputField icon="fas fa-phone" placeholder="Phone Number" type="text" />
      <InputField icon="fas fa-map-marker-alt" placeholder="Address" type="text" />   
      <SelectField
        label="Gender"
        options={[
          { label: "Select Gender", value: "" },
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ]}
      />

    <AuthButton text="Sign Up" onClick={handleSubmit} />
    </FormContainer>
  );
};

export default SignUpForm;
