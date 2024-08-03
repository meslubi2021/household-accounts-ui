import { NextResponse } from "next/server";
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import { jwtVerify } from 'jose';

acceptLanguage.languages(languages);

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|.test|.swa|favicon.ico|sw.js|health.html|manifest).*)']
}


export function middleware(req: any) {
    const jwtSecret = process.env.JWT_SECRET;
    let lng
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    if (!lng) lng = fallbackLng
  
    // Verify Token
    const userInfo = req.cookies.get('userInfo'); // Get the token from cookies
    const userInfoParsed = userInfo && JSON.parse(userInfo.value);
    if (!(userInfoParsed?.accessToken)) {
      if(!req.url.includes("login")){
        return NextResponse.redirect(new URL(`/${lng}/login`, req.url));
      }
    }
    // Redirect if lng in path is not supported
    if (
      !languages.some((loc:string) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith('/_next')
    ) {
      try {
        const result = jwtVerify(userInfoParsed.accessToken, new TextEncoder().encode(jwtSecret || ""));
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
      } catch (err) {
        console.log(err);
        return NextResponse.redirect(new URL(`/${lng}/login`, req.url));
      }
    }
  
    if (req.headers.has('referer')) {
      const refererUrl = new URL(req.headers.get('referer'))
      const lngInReferer = languages.find((l:string) => refererUrl.pathname.startsWith(`/${l}`))
      const response = NextResponse.next()
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
      return response
    }
  
    return NextResponse.next()
  }