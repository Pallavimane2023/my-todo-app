This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Instructions to set up and run the application locally.

To learn more about Next.js, take a look at the following resources:

- add MONGODB_URI to .env file to connect mongodb atlas 
- navigate to `my-todo-app` and start npm run dev to run project locally.

## A brief description of the features implemented.
TODO App
- Implemented user authentication using next-auth.
- Allowed users to register and log in securely and protected routes so only authenticated users can access Todo functionality.
- Implemented CURD operations for TODO functionality.
- Using Next.js API routes to handle backend logic.
- Storing data in a database MongoDB.
- Implemented next-intl (internationalization) to support two languages (English and Spanish).
- Using Typescript and Tailwind CSS. 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
