import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: IMGBB_API_KEY is not set.' }, 
        { status: 500 }
      );
    }

    // Convert file to base64 for ImgBB
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Upload to ImgBB
    const imgbbFormData = new URLSearchParams();
    imgbbFormData.append('key', apiKey);
    imgbbFormData.append('image', base64Image);
    if (file.name) {
      imgbbFormData.append('name', file.name.split('.')[0]); // Optional name
    }

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: imgbbFormData.toString(),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('ImgBB Error:', data);
      throw new Error(data.error?.message || 'Failed to upload to external service');
    }

    // Return the URL path
    return NextResponse.json({ url: data.data.url, success: true });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
