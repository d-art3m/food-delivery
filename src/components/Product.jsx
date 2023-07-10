'use client';

import { addProduct } from '@/app/redux/cartSlice';
import { useDispatch } from 'react-redux';

export default function Product(props) {
  const { name, price, image } = props;
  const dispatch = useDispatch();

  return (
    <div className="border flex flex-col rounded m-5 bg-teal-700">
      <div className="h-75 grow max-w-full">
        <img className="h-full w-full object-cover" src={image} alt={name} />
      </div>
      <div>
        <div className="flex justify-around m-3">
          <div>{name}</div>
          <div>{price} $</div>
        </div>
        <div className="flex justify-center m-2">
          <button
            className="border rounded-lg p-2 bg-teal-900"
            onClick={() => dispatch(addProduct(props))}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
