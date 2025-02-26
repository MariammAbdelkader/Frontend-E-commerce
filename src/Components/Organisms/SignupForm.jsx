import styled from "styled-components";
import InputField from "../Molecules/InputField";
import AuthButton from "../Molecules/AthunButton";
import SelectField from "../Molecules/SelectField";
import AuthFormLinks from "../Molecules/AthunFormLinks";
import ErrorText from "../Molecules/ErrorText";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-height: 400px; /* عشان لو الفورم زادت تبدأ تظهر السكروول */

`;


const SignUpForm = ({ formData, handleChange, handleSubmit, loading, passwordMismatch, error, success }) => {

  
  
  return (
    <FormContainer>
      <h2>Create Account</h2>


      {error && <ErrorText message={error} />}

      <InputField name="firstName" icon="fas fa-user" placeholder="First Name" type="text" value={formData.firstName} onChange={handleChange} />
      <InputField name="lastName" icon="fas fa-user" placeholder="Last Name" type="text" value={formData.lastName} onChange={handleChange} />
      <InputField name="email" icon="fas fa-envelope" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} />
      <InputField name="password" icon="fas fa-lock" placeholder="Password" type="password" value={formData.password} onChange={handleChange} />
      
      <InputField name="confirmPassword" icon="fas fa-lock" placeholder="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange}/>

      <InputField name="phoneNumber" icon="fas fa-phone" placeholder="Phone Number" type="text" value={formData.phone} onChange={handleChange} />
      <InputField name="address" icon="fas fa-map-marker-alt" placeholder="Address" type="text" value={formData.address} onChange={handleChange} />

      <SelectField
        label="Gender"
        name="Gender"
        value={formData.gender}
        options={[
          { label: "Select Gender", value: "" },
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]}
        onChange={handleChange}
      />

    <AuthButton type ="submit" text={loading ? "Signing Up..." : "Sign Up"} disabled={loading} onClick={handleSubmit}/>
    </FormContainer>
  );
};

export default SignUpForm;
