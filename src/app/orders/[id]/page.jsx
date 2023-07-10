async function getData(id) {
  const response = await fetch(`${process.env.APP_API_URL}/orders/${id}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return [];
  return response.json();
}

async function getProduct(id) {
  const response = await fetch(`${process.env.APP_API_URL}/product/${id}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return [];
  return response.json();
}

export default async function Order({ params }) {
  const { id } = params;
  const data = await getData(id);
  const products = [];

  for (let i = 0; i < data.items.length; i++) {
    products.push({
      id: data.items[i]._id,
      product: await getProduct(data.items[i].product),
      quantity: data.items[i].quantity,
    });
  }

  const total = products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="m-3">
      <div className="text-2xl">Order #{id}</div>
      <div className="text-xl">Name: {data.name}</div>
      <div className="text-xl">Email: {data.email}</div>
      <div className="text-xl">Phone: {data.phone}</div>
      <div className="text-xl">Address: {data.address}</div>
      <div className="text-xl">Status: {data.status}</div>
      <div className="text-xl">Products:</div>
      {products.map((item) => (
        <div key={item.id}>
          - {item.product.name} (x{item.quantity})
        </div>
      ))}
      <div className="text-xl">Total: {total} $</div>
    </div>
  );
}
