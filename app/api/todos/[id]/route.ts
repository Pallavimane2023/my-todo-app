// app/api/todos/[id]/route.ts
import { NextResponse } from 'next/server';


import { connectDB } from '@/lib/mongodb';
import Todo from '@/models/todo';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const session = await getServerSession(authOptions);

  // Check if session and session.user are defined
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Fetch the TODO item by ID
  const id = (await params).id; 
  const todo = await Todo.findById(id);

  // If the TODO item is not found, return a 404 response
  if (!todo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }

  return NextResponse.json(todo);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  // Get the session to retrieve the user ID
  const session = await getServerSession(authOptions);

  // Check if session and session.user are defined
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, status } = await request.json();

  const id = (await params).id; 

  const todo = await Todo.findByIdAndUpdate(
   id,
    { title, description, status },
    { new: true }
  );
  return NextResponse.json(todo);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id; 

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await Todo.findByIdAndDelete(id);

  return NextResponse.json({message:"deleted successfully"});
}