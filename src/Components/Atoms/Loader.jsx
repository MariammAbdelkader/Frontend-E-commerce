// 📂 components/atoms/Loader.jsx
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledLoader = styled.div`
  border: ${(props) => props.size || "4px"} solid ${(props) => props.bgColor || "#f3f3f3"};
  border-top: ${(props) => props.size || "4px"} solid ${(props) => props.color || "#3498db"};
  border-radius: 50%;
  width: ${(props) => props.width || "40px"};
  height: ${(props) => props.height || "40px"};
  animation: ${spin} 1s linear infinite;
`;

const LoaderAtom = ({ ...styles }) => {
  return <StyledLoader {...styles} />;
};

export default LoaderAtom;
//<LoaderAtom color="red" size="6px" width="50px" height="50px" />
