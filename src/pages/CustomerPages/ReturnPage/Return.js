import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { styles } from './styles'; // assuming your styles file is here
import { getHistory, requestReturn } from '../../../Services/ReturnServices';

const ReturnProductPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');
  const [productOptions, setProductOptions] = useState([]);

  // Check if form is valid
  const isFormValid = orderId && productId && quantity > 0 && reason;

  const handleSubmit = async () => {
    try {
      const returndata = await requestReturn({
        orderId,
        productId,
        quantity,
        reason,
      });


      if (returndata.success) {
        alert('Return request submitted successfully!');
        // Reset form
        setOrderId('');
        setProductName('');
        setProductId('');
        setQuantity(1);
        setReason('');
        setProductOptions([]);
      } else {
        alert('Failed to submit return request: ' + returndata.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting your request.');
    }
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const data = await getHistory();
      if (data.details) {
        setOrders(data.details);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleOrderChange = (e) => {
    const selectedOrderId = e.target.value;
    setOrderId(selectedOrderId);

    const selectedOrder = orders.find((order) => order.orderId === selectedOrderId);
    if (selectedOrder) {
      setProductOptions(selectedOrder.products);
    } else {
      setProductOptions([]);
    }

    // Clear selected product
    setProductName('');
    setProductId('');
  };

  return (
    <Box sx={{ ...styles.cartContainer, maxWidth: '600px', margin: 'auto', mt: 6 }}>
      <Typography sx={{ ...styles.cartTitle, ml: 0, mb: 3 }}>Return Product</Typography>

      {/* Order ID */}
      <TextField
        select
        label="Order ID"
        value={orderId}
        onChange={handleOrderChange}
        fullWidth
        sx={{ mb: 3, bgcolor: '#fff' }}
      >
        {orders.map((order) => (
          <MenuItem key={order.orderId} value={order.orderId}>
            {order.orderId}
          </MenuItem>
        ))}
      </TextField>

      {/* Product Name */}
      <TextField
        select
        label="Product Name"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
          const selectedProduct = productOptions.find((p) => p.name === e.target.value);
          setProductId(selectedProduct ? selectedProduct.productId : '');
        }}
        fullWidth
        sx={{ mb: 3, bgcolor: '#fff' }}
        disabled={!orderId}
      >
        {productOptions.map((product) => (
          <MenuItem key={product.productId} value={product.name}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Quantity */}
      <TextField
        type="number"
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        sx={{ mb: 3, bgcolor: '#fff' }}
        inputProps={{ min: 1 }}
      />

      {/* Reason */}
      <TextField
        label="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 4, bgcolor: '#fff' }}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={styles.checkoutButton}
        fullWidth
        disabled={!isFormValid}
      >
        Submit Return Request
      </Button>
    </Box>
  );
};

export default ReturnProductPage;
