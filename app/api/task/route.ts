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

export async function DELETE(req: Request) {
    try {
      const { id } = await req.json();  // Extract 'id' from the request body
  
      // Ensure 'id' exists in the request body
      if (!id) {
        return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
      }
  
      // Delete the task from the 'tasks' table using the 'id'
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);  // Use .eq() to match the 'id' field with the provided 'id'
  
      if (error) throw error;  // Throw error if the deletion fails
  
      return NextResponse.json({ success: true, data }, { status: 200 });  // Return the success response
    } catch (error) {
      return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });  // Return error response
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