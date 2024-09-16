import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const filePath = path.resolve(process.cwd(), 'data', 'heroesData.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'This endpoint only supports POST requests' }, { status: 405 });
}
