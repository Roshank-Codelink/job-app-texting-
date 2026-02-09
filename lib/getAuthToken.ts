import { auth } from './auth-config';
import { getSession } from 'next-auth/react';

export const getAuthToken = async (): Promise<string> => {
  // CLIENT
  if (typeof window !== 'undefined') {
    const session = await getSession();
    return session?.user?.token || '';
  }
  // SERVER
  const session = await auth();
  return session?.user?.token || '';
};