import React, { useState,useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {paymob} from '../../../Services/paymentServices'; 
import{ConfirmOrder} from '../../../Services/OrderServices';
import { getCustomerProfile } from '../../../Services/CustomerServices';

const ConfirmOrderWindow = ({ open, handleClose,refetch }) => {
const [paymentMethod, setPaymentMethod] = useState('online');
const [address, setAddress] = useState('');
const [phoneNumber, setphoneNumber] = useState('');
  
  
    const navigate = useNavigate();

  const handleConfirm = async () => {
      const response = await ConfirmOrder({ shippingAddress: address, phoneNumber });
      if (response.success) {
           if( paymentMethod === 'online') { 
              const res= await paymob({orderId:response.order.orderId})
                  if (res.success && res.paymentUrl) {
                      console.log('Payment URL:', res.paymentUrl);
                          window.location.href = res.paymentUrl;
                  } else {
                          alert('Order confirmed but online payment not available. Thank you!');
                  }
              }
                  
      } else {
        alert('Failed to confirm order: ' + response.error);
      }
      handleClose();
      refetch();
  };

   
    const userData=async () => {
       const response = await getCustomerProfile();
       if (response.success) {
         setAddress(response.profile.address || '');
         
         setphoneNumber(response.profile.phoneNumber || '');
       } else {
         console.error('Failed to fetch user data:', response.error);
       }
    }

    useEffect(() => {
      userData();
    }, []);

  const isConfirmEnabled =
    (phoneNumber!=='' && address.trim() !== '');

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Complete Your Order</DialogTitle>
      <DialogContent sx={{ minWidth: 350, p: 2 }}>
        <FormControl fullWidth sx={{ mb: 3 , mt: 1 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            label="Payment Method"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="online">online</MenuItem>
            <MenuItem value="on delivery">on delivery</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ mb: 3 }}
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!isConfirmEnabled}
        >
          Confirm Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmOrderWindow;
