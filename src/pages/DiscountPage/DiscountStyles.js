import { styled } from "@mui/material/styles";
import { Box, Button, Slider } from "@mui/material";

export const useStyles = {
  title: {
    marginBottom: "24px",
    color: "#1b0099",
  },
};

export const StyledContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  padding: "24px",
});

export const StyledBox = styled(Box)({
  width: "80%",
});

export const StyledSlider = styled(Slider)({
  color: "#1b0099",
  marginTop: "8px",
  marginLeft: "8px",
  width: "48%",
});

export const StyledButtonContainer = styled(Box)({
  marginTop: "16px",
  textAlign: "left",
});

export const StyledButton = styled(Button)({
  backgroundColor: "#1b0099",
  "&:hover": {
    backgroundColor: "#140077",
  },
});
