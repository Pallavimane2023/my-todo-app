// components/LanguageSelector.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const [locale, setLocale] = useState<string>("");
  const router = useRouter();
  useEffect(()=>{
    const cookieLocale = document.cookie.split("; ").find((row)=>row.startsWith("MYNEXTAPP_LOCALE="))?.split("=")[1];
    if(cookieLocale){
      setLocale(cookieLocale);
    }else{
      const browserLocale=navigator.language.slice(0,2);
      setLocale(browserLocale);
      document.cookie= `MYNEXTAPP_LOCALE=${browserLocale}; `;//path=/
      router.refresh();
    }

  },[router])
  

  const changeLanguage = (lang: string) => {
    setLocale(lang);
    document.cookie=`MYNEXTAPP_LOCALE=${lang};`;
    router.refresh();
  };

  return (
    <div className="flex space-x-2">
      <select onChange={(e) => changeLanguage(e.target.value)} value={locale} className="bg-blue-500 text-white px-4 py-2 rounded">
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
    </div>
  );
};

export default LanguageSelector;