import styled from "styled-components";
import TextAtom from "../Atoms/Text";
import IconAtom from "../Atoms/Icon"; 

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #ffdddd;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ff0000;
  width: 100%;
  justify-content: center;
  gap: 8px;
`;

const ErrorTextMolecule = ({ message }) => {
  if (!message) return null;

  return (
    <ErrorWrapper>
      <IconAtom name="fas fa-exclamation-circle" color="red" />
      <TextAtom text={message} />
    </ErrorWrapper>
  );
};

export default ErrorTextMolecule;
