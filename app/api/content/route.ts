import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { section, payload } = await request.json();
    
    // Read the current data
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Update the targeted section
    // E.g., if section === 'skills', we overwrite data['skills'] with payload
    if (section && payload !== undefined) {
      data[section] = payload;
    } else {
        return NextResponse.json({ error: 'Invalid section or payload' }, { status: 400 });
    }

    // Write back to file
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Data updated successfully', data });
  } catch (error) {
    console.error('Error writing data:', error);
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
