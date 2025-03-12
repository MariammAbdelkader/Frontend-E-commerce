import React from "react";
import { Grid, TextField, Typography, Divider } from "@mui/material";
import useDiscountContainer from "./DiscountContainer";
import {
  useStyles,
  StyledContainer,
  StyledBox,
  StyledSlider,
  StyledButtonContainer,
  StyledButton,
} from "./DiscountStyles";

const DiscountPresenter = ({ activeSubItem }) => {
  const classes = useStyles;
  const {
    discountRate,
    setDiscountRate,
    category,
    setCategory,
    productCode,
    setProductCode,
    productDiscountRate,
    setProductDiscountRate,
  } = useDiscountContainer();

  if (activeSubItem !== "Add Discount") return null;

  const handleDiscountChange = (setter) => (e) => {
    let value = e.target.value === "" ? "" : Number(e.target.value);
    if (value !== "" && (value < 1 || value > 100)) return;
    setter(value);
  };

  return (
    <StyledContainer>
      <StyledBox>
        {/* Title */}
        <Typography variant="h5" sx={classes.title}>
          Add Discount
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Discount Rate (%)"
              variant="outlined"
              value={discountRate}
              onChange={handleDiscountChange(setDiscountRate)}
              inputProps={{ min: 1, max: 100 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledSlider
              value={discountRate || 1}
              onChange={(e, newValue) => setDiscountRate(newValue)}
              min={1}
              max={100}
              step={1}
            />
          </Grid>
        </Grid>

        <StyledButtonContainer>
          <StyledButton
            variant="contained"
            size="large"
            disabled={discountRate === "" || category.trim() === ""}>
            Add Discount
          </StyledButton>
        </StyledButtonContainer>

        <Divider sx={{ my: 4 }} />

        {/* Apply Discount to Specific Product Section */}
        <Typography variant="h6" sx={classes.title}>
          Apply Discount to Specific Product
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Discount Rate (%)"
              variant="outlined"
              value={productDiscountRate}
              onChange={handleDiscountChange(setProductDiscountRate)}
              inputProps={{ min: 1, max: 100 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Code"
              variant="outlined"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledSlider
              value={productDiscountRate || 1}
              onChange={(e, newValue) => setProductDiscountRate(newValue)}
              min={1}
              max={100}
              step={1}
            />
          </Grid>
        </Grid>

        <StyledButtonContainer>
          <StyledButton
            variant="contained"
            size="large"
            disabled={productCode.trim() === "" || productDiscountRate === ""}>
            Apply Discount to Product
          </StyledButton>
        </StyledButtonContainer>
      </StyledBox>
    </StyledContainer>
  );
};

export default DiscountPresenter;
