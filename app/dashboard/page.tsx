import UserTodoInfo from "@/components/UserTodoInfo";
import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const messages:AbstractIntlMessages = await getMessages({locale});
    const title = (messages.tabTitle as AbstractIntlMessages).home;
    return{
      title:title
    }
  }

export default function Dashboard(){
    return <UserTodoInfo/>
}