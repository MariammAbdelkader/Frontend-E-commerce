// 📂 components/molecules/AuthFormLinks.jsx
import LinkAtom from "../Atoms/Link";

const AuthFormLinks = () => {
  return (
    <div>
      <LinkAtom to="/forgot-password" color="#ff6347">
        Forgot Your Password?
      </LinkAtom>
      <br />
      <LinkAtom to="/signup" bold>
        Sign Up
      </LinkAtom>
    </div>
  );
};

export default AuthFormLinks;
