// app/api/todos/[id]/route.ts
import { NextResponse } from 'next/server';


import { connectDB } from '@/lib/mongodb';
import Todo from '@/models/todo';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const todo = await Todo.findById(params.id);
  return NextResponse.json(todo);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectDB();
  // Get the session to retrieve the user ID
  const session = await getServerSession(authOptions);

  // Check if session and session.user are defined
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, status } = await request.json();

  // Update the TODO item associated with the authenticated user
  const todo = await Todo.findByIdAndUpdate(
    params.id,
    { title, description, status },
    { new: true } // Return the updated document
  );
  return NextResponse.json(todo);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Await the params to access its properties
  const { id } = await params; // Await params

  // Get the session to retrieve the user ID
  const session = await getServerSession(authOptions);

  // Check if session and session.user are defined
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Delete the TODO item associated with the authenticated user
  await Todo.findByIdAndDelete(id); // Use the awaited id

  return NextResponse.json({message:"deleted successfully"});
}