import Link from 'next/link';

async function getData() {
  const response = await fetch(`${process.env.APP_API_URL}/categories`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return null;
  return response.json();
}

export default async function CategoriesLayout({ children }) {
  const data = await getData();

  if (!data) {
    return <div className="text-center text-lg m-6">Error loading data!</div>;
  }

  return (
    <div>
      <div className="flex overflow-x-auto">
        {data.map((item) => (
          <Link
            key={item._id}
            className="border rounded-md p-2 m-3 text-center bg-teal-700"
            href={`/categories/${item._id}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
