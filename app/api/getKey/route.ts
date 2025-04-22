// import { NextApiRequest, NextApiResponse } from 'next';

import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      { success: true, key: process.env.OPEN_KEY },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
