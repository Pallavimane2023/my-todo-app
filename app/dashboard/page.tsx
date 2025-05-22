import UserTodoInfo from "@/components/UserTodoInfo";
import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
    params:{locale}
  }:{
    params:{locale:string}
  }){
    const messages:AbstractIntlMessages = await getMessages({locale});
    const title = (messages.tabTitle as AbstractIntlMessages).home;
    return{
      title:title
    }
  }

export default function Dashboard(){
    return <UserTodoInfo/>
}