import { supabase } from '@/app/lib/supabase';
// import { NextApiRequest, NextApiResponse } from 'next';

 
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description }]);

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}


 

export async function GET() {
    try {
      const { data, error } = await supabase.from('tasks').select('*');
  
      if (error) throw error;
  
      return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  }