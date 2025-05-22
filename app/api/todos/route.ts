

import { connectDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import authOptions from "@/lib/authOptions";

export async function GET() {
  await connectDB();

  // Get the session to retrieve the user ID
  const session = await getServerSession(authOptions);

  // Check if session and session.user are defined
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Fetch todos for the authenticated user
  const todos = await Todo.find({ userId: session.user.id }); // Ensure you filter by user ID
  return NextResponse.json(todos);
}

export async function POST(req:Request){
    try{
        const {title, description, userId} = await req.json();
        console.log(title,description,userId,"formdata")
        const todo = await Todo.create({title, description, userId});
        return NextResponse.json(todo,{status:201})

    }catch(error){
        return NextResponse.json({message:`failed to add TodoList:${error}`},{status:500})
    }

}