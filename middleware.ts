import { NextResponse } from "next/server";
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";
import { jwtVerify } from 'jose';

acceptLanguage.languages(languages);

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|.test|.swa|favicon.ico|sw.js|health.html|manifest).*)']
}


export async function middleware(req: any) {
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
        await jwtVerify(userInfoParsed.accessToken, new TextEncoder().encode(jwtSecret || ""));
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
      } catch (err:any) {
        if(err.code === "ERR_JWT_EXPIRED"){
          const response = NextResponse.redirect(new URL(`/${lng}/login`, req.url));
          response.cookies.delete("userInfo");
          return response;
        }else{
          // Unknown error, need to remove cookies and redirect login again.
          const response = NextResponse.redirect(new URL(`/${lng}/login`, req.url));
          response.cookies.delete("userInfo");
          return response;
        }
      }
    }
  
    if (req.headers.has('referer')) {
      const refererUrl = new URL(req.headers.get('referer'))
      const lngInReferer = languages.find((l:string) => refererUrl.pathname.startsWith(`/${l}`))
      const response = NextResponse.next()
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
      return response
    }

    try{
      await jwtVerify(userInfoParsed.accessToken, new TextEncoder().encode(jwtSecret || ""));
      const response = NextResponse.next();
      return response;
    }catch(err:any){
      if(err.code === "ERR_JWT_EXPIRED"){
        const response = NextResponse.redirect(new URL(`/${lng}/login`, req.url));
        response.cookies.delete("userInfo");
        return response;
      }else{
        return NextResponse.next()
      }
    }
  }