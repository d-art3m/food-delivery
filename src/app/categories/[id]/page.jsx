import Products from '@/components/Products';

async function getData(id) {
  const response = await fetch(`${process.env.APP_API_URL}/categories/${id}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return [];
  return response.json();
}

export default async function Category({ params }) {
  const { id } = params;
  const data = await getData(id);
  return (
    <div className="grid-container">
      <Products products={data} />
    </div>
  );
}
