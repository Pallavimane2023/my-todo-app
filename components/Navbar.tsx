"use client";
import LanguageSelector from "@/components/LanguageSelector";
import { signOut, useSession } from "next-auth/react";
import {useTranslations} from 'next-intl';


const Navbar = ()=>{

  const t = useTranslations('my-todo');
  const { data: session } = useSession();
  return (
        <div className="flex flex-col max-h-screen">
          <header className="bg-purple-600 text-white p-4">
            {session ? (
          <div className="flex items-center justify-end">
            <span className="mr-4">{t('welcome')},{session.user?.name || session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-4 py-2 mr-2 rounded hover:bg-red-700"
            >
              {t("logout")}
            </button>
            <LanguageSelector/>
          </div>
        ) : (
          <span className="text-amber-100">TODO APP</span>
        )}  
        </header>
        </div>
  );
}
export default Navbar;