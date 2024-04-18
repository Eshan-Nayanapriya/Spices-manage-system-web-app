import React from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


function Checkout() {
  return (
    <div>

      <form>
        <label>
          User Name:
          <input type="text" name="name" required />
        </label>
        <br />
        <label>
          Total Amount:
          <input type="number" name="total" required />
        </label>
        <br />
      </form>

      <Link to="/deliveryinfo">
      <Button type="submit">Checkout</Button>
      </Link>

    </div>
  )
}

export default Checkout
