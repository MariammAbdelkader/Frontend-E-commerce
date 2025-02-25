// 📂 components/atoms/Icon.jsx
import styled from "styled-components";

const StyledIcon = styled.i`
  margin-right: 10px;
  color: #aaa;
  font-size: 16px;
`;

const IconAtom = ({ name }) => {
  return <StyledIcon className={`fas ${name}`} />;
};

export default IconAtom;
