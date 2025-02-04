export default async function Page({
  params,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  return <div>Topic Page: {params.id}</div>;
}