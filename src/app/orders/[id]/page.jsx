async function getData(id) {
  const response = await fetch(`${process.env.APP_API_URL}/orders/${id}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return [];
  return response.json();
}

export default async function Order({ params }) {
  const { id } = params;
  const data = await getData(id);
  const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="m-3">
      <div className="text-2xl">Order #{id}</div>
      <div className="text-xl">Name: {data.name}</div>
      <div className="text-xl">Email: {data.email}</div>
      <div className="text-xl">Phone: {data.phone}</div>
      <div className="text-xl">Address: {data.address}</div>
      <div className="text-xl">Status: {data.status}</div>
      <div className="text-xl">Products:</div>
      {data.items.map((item) => (
        <div key={item.id}>
          - {item.product} (x{item.quantity})
        </div>
      ))}
      <div className="text-xl">Total: {total} $</div>
    </div>
  );
}
