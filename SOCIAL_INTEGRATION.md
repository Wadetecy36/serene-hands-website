# Serene Hands social feed integration

This phase adds server-side feed adapters for Instagram and TikTok and a frontend Social Hub on the homepage.

## What is implemented

- `api/instagram.ts` fetches recent media from the Instagram API.
- `api/tiktok.ts` fetches recent public videos from TikTok Display API v2.
- `src/lib/socialFeeds.ts` keeps browser code talking only to same-origin `/api/*` endpoints.
- `src/components/SocialHub.tsx` renders the feeds without exposing access tokens.
- The homepage now includes the Social Hub after the care journey.

## Vercel environment variables

Set these in Vercel Project Settings → Environment Variables:

```text
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_USER_ID=...
META_GRAPH_VERSION=...
TIKTOK_ACCESS_TOKEN=...
TIKTOK_PROFILE_URL=https://www.tiktok.com/@serenehandshomecare
```

Do **not** use `VITE_` prefixes for tokens. They would be bundled into the browser build.

## Instagram

The Instagram API requires a Professional Instagram account and the appropriate Meta app/access-token setup. The feed adapter requests recent media and renders the returned image/video thumbnail and permalink.

## TikTok

The TikTok Display API requires an approved TikTok developer app, Login Kit, and the `user.info.basic` and `video.list` scopes. TikTok's current access tokens expire after 24 hours, while refresh tokens are valid for 365 days. This ZIP intentionally starts with server-side read access; OAuth + refresh-token persistence should be completed before production so the feed can renew tokens automatically.

## Next integration step

Create the Meta and TikTok developer apps, authorize the client's accounts, and provide the resulting server-side credentials in Vercel. Then test `/api/instagram` and `/api/tiktok` directly before moving on to automated token refresh/storage.
