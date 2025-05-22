import NextAuth from 'next-auth';
import authOptions from '@/lib/authOptions';

const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };