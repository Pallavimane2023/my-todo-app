import LoginForm from "@/components/LoginForm";
import {getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "./api/auth/[...nextauth]/route";

  async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session,"hh")
  if(session) redirect('/dashboard');
  return (
    <main><LoginForm/></main>
  );
}

export default Home;