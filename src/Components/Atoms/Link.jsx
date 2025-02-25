import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: ${(props) => props.color || "#007bff"};
  text-decoration: none;
  font-size: ${(props) => props.size || "14px"};
  font-weight: ${(props) => props.bold ? "bold" : "normal"};

  &:hover {
    text-decoration: underline;
  }
`;

const LinkAtom = ({ to, children, color, size, bold }) => {
  return (
    <StyledLink to={to} color={color} size={size} bold={bold}>
      {children}
    </StyledLink>
  );
};

export default LinkAtom;
