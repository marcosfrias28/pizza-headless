import cookieParser from 'cookie-parser';

export function onRequest (context, next ) {
    cookieParser(context.req, context.res);
    next();
}