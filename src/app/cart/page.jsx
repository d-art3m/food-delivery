'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import {
  removeProduct,
  incQuantity,
  decQuantity,
  reset,
} from '@/app/redux/cartSlice';

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    const order = {
      items: cartItems.map((item) => {
        return { product: item.product._id, quantity: item.quantity };
      }),
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
      status: 'accepted',
    };
    try {
      const res = await fetch('/api/order', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      res.status === 201 ? setOpenDialog(true) : setError(true);
    } catch (error) {
      setError(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    router.push('/');
    dispatch(reset());
  };

  if (!cartItems.length)
    return <div className="text-center mt-3 text-4xl">Cart is empty!</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="my-3 text-center text-4xl">Cart</div>
      <div className="flex flex-col">
        {cartItems.map((item) => (
          <div className="flex mt-3" key={item.product._id}>
            <div className="grow">
              {item.product.name} ({item.product.price} $)
            </div>
            <div className="flex">
              <button
                className="mx-2"
                onClick={() => dispatch(decQuantity(item.product._id))}
              >
                <RemoveCircleOutlineIcon />
              </button>
              <div className="w-6 text-center">{item.quantity}</div>
              <button
                className="mx-2"
                onClick={() => dispatch(incQuantity(item.product._id))}
              >
                <AddCircleOutlineIcon />
              </button>
              <button
                className="mr-4"
                onClick={() => dispatch(removeProduct(item.product._id))}
              >
                <DeleteIcon />
              </button>
              <div className="w-16 text-center">
                {item.product.price * item.quantity} $
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-3 text-center text-2xl">Total: {totalPrice} $</div>

      <form className="w-full md:w-3/5" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col m-3">
          <label className="flex mt-2">
            <span className="w-20 mr-2">Name: </span>
            <input
              className="w-full px-1 text-black"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
          </label>
          <label className="flex mt-2">
            <span className="w-20 mr-2">Email: </span>
            <input
              className="w-full px-1 text-black"
              type="email"
              name="email"
              placeholder="email@example.com"
              required
            />
          </label>
          <label className="flex mt-2">
            <span className="w-20 mr-2">Phone: </span>
            <input
              className="w-full px-1 text-black"
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="0123456789"
              required
            />
          </label>
          <label className="flex mt-2">
            <span className="w-20 mr-2">Address: </span>
            <input
              className="w-full px-1 text-black"
              type="text"
              name="address"
              placeholder="City, Street"
              required
            />
          </label>
          <button
            className="w-full mt-3 rounded-lg p-2 bg-teal-900"
            type="submit"
          >
            Order
          </button>
        </div>
      </form>

      {error && (
        <div className="text-center mt-3 text-4xl">Something went wrong!</div>
      )}

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Order accepted</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
