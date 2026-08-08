import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: { data: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Decode the data
    const decodedStr = Buffer.from(params.data, 'base64url').toString('utf-8');
    const data = JSON.parse(decodedStr);

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
  } catch (e) {
    return {
      title: 'Invalid Link',
      description: 'This link is invalid or corrupted.',
    };
  }
}

export default function SharedPage({ params }: Props) {
  try {
    const decodedStr = Buffer.from(params.data, 'base64url').toString('utf-8');
    const data = JSON.parse(decodedStr);

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
  } catch (e) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-red-600">Invalid Link</h1>
      </div>
    );
  }
}
