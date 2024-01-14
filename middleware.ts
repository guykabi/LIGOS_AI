export {default} from 'next-auth/middleware' 

export const config = { matcher: [
  '/dashboard',
  '/chat',
  '/videoGeneration',
  '/imageGeneration',
  '/musicGeneration',
  '/codeGeneration',
  '/settings'
]}