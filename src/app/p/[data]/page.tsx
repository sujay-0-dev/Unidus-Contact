import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: { data: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    // Decode the data safely without relying on Node's Buffer (safe for all Next.js runtimes)
    const base64 = resolvedParams.data.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
    const decodedStr = atob(padded);
    
    const data = JSON.parse(decodeURIComponent(decodedStr));

    const title = data.t || 'Check out this post!';
    const description = data.d || 'Shared via UNIDUS';
    const imageUrl = data.i;

    if (!imageUrl) throw new Error('No image');

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (e: any) {
    return {
      title: `Error: ${e.message}`,
      description: 'This link is invalid or corrupted.',
    };
  }
}

export default async function SharedPage({ params }: Props) {
  try {
    const resolvedParams = await params;
    const base64 = resolvedParams.data.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
    const decodedStr = atob(padded);
    
    const data = JSON.parse(decodeURIComponent(decodedStr));

    if (data.r) {
      // If a redirect URL was provided, we can optionally redirect users who actually click the link
      // redirect(data.r);
    }
    
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <img src={data.i} alt={data.t} className="w-full h-auto object-cover max-h-[600px]" />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.t}</h1>
            <p className="text-gray-600 text-lg mb-8">{data.d}</p>
            {data.r ? (
              <a href={data.r} className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
                Learn More
              </a>
            ) : (
              <a href="/" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
                Create Your Own
              </a>
            )}
          </div>
        </div>
      </div>
    );
  } catch (e: any) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Invalid Link</h1>
          <p className="text-gray-600 font-mono text-sm">{e.message}</p>
        </div>
      </div>
    );
  }
}
