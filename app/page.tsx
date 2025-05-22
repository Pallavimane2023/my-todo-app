import LoginForm from "@/components/LoginForm";
import authOptions from "@/lib/authOptions";
import {getServerSession } from "next-auth";
import { redirect } from "next/navigation";

  async function Home() {
  const session = await getServerSession(authOptions);
  if(session) redirect('/dashboard');
  return (
    <main><LoginForm/></main>
  );
}

export default Home;