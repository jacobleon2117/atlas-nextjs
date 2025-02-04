import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string }}): Promise<Metadata> {
  return {
    title: `Topic ${params.id}`
  };
}

export default async function Page({
  params,
}: Readonly<{
  params: Readonly<{
    id: string;
  }>;
}>) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  return <div>Topic Page: {params.id}</div>;
}