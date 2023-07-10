import Link from 'next/link';

async function getData() {
  const response = await fetch(`${process.env.APP_API_URL}/categories`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) return null;
  return response.json();
}

export default async function Home() {
  const data = await getData();

  if (!data)
    return (
      <div className="text-center font-bold text-2xl my-8">
        Error loading data!
      </div>
    );

  return (
    <div className="flex flex-col items-center mx-3">
      {data.map((item) => (
        <Link
          key={item._id}
          className="border rounded-md mt-3 p-5 w-full md:w-3/5 text-2xl text-center bg-teal-700"
          href={`/categories/${item._id}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
