import { NextResponse } from 'next/server';
import { MOCK_CERTIFICATE } from '@/lib/mockData';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (id === MOCK_CERTIFICATE.certificateId || id.toLowerCase().includes('hlms')) {
    return NextResponse.json({
      success: true,
      certificate: MOCK_CERTIFICATE,
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: `Certificate ID "${id}" was not found in the official registry.`,
    },
    { status: 404 }
  );
}
