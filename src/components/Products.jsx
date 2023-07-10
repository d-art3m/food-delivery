import Product from './Product';

export default function Products({ products = [] }) {
  if (!products.length) {
    return <div className="text-center mt-8 text-2xl">Nothing found</div>;
  }
  return products.map((product) => <Product key={product._id} {...product} />);
}
