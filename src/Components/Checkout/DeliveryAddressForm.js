import React from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function DeliveryAddressForm() {
  return (
    <div>


      <Link to="/summary">
      <Button type="submit">Proceed to Payment</Button>
      </Link>


    </div>
  )
}

export default DeliveryAddressForm
