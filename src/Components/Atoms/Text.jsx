import styled from "styled-components";

const StyledText = styled.p`
  color: gray;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const TextAtom = ({ text }) => {
  return <StyledText>{text}</StyledText>;
};

export default TextAtom;
