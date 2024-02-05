export {default} from 'next-auth/middleware' 

export const config = { matcher: [
  '/dashboard',
  '/chat',
  '/video',
  '/image',
  '/music',
  '/code',
  '/settings'
]}