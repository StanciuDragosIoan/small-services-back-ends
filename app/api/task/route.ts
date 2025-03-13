import { supabase } from '@/app/lib/supabase';
// import { NextApiRequest, NextApiResponse } from 'next';

 
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, description, column } = await req.json();
    console.log("received data",  title, description, column );
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, column }]);

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
      const { id, title, description, column } = await req.json();  
  
    
      const updateData: {id: string, title?:string, description?:string, column?:string } = {id};  
 
      if (title) updateData.title = title;  
      if (description) updateData.description = description;   
      if (column) updateData.column = column;   
  
      if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ success: false, message: 'No valid fields to update' }, { status: 400 });
      }
  
   
      const { data, error } = await supabase
        .from('tasks')
        .update(updateData)  // Update only the fields that were provided
        .eq('id', id);  // Filter by task ID
  
      if (error) throw error;
  
      return NextResponse.json({ success: true, data }, { status: 200 });
  
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