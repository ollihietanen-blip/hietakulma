import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }

  interface User {
    sessionVersion: number;
    id: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sessionVersion: number;
    id: string;
    email: string;
  }
}

