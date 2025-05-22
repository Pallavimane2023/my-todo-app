import RegisterForm from "@/components/RegisterForm";
import authOptions from "@/lib/authOptions";
import {getServerSession} from "next-auth";
import {redirect} from 'next/navigation';

export default async function register(){

    const session = await getServerSession(authOptions);
    if(session) redirect('/dashboard');
    return <RegisterForm/>
}