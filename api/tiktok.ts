/**
 * Server-side TikTok Display API feed adapter for Vercel.
 *
 * Required Vercel environment variables:
 * - TIKTOK_ACCESS_TOKEN
 *
 * Optional profile metadata:
 * - TIKTOK_PROFILE_URL
 *
 * Keep access/refresh credentials server-side. Do NOT prefix them with VITE_.
 * Full OAuth + refresh-token persistence should be added before relying on
 * this in production because TikTok access tokens expire after 24 hours.
 */

type TikTokVideo = {
  id: string;
  title?: string;
  video_description?: string;
  duration?: number;
  cover_image_url?: string;
  embed_link?: string;
  create_time?: number;
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
  const profileUrl = process.env.TIKTOK_PROFILE_URL || "https://www.tiktok.com/@serenehandshomecare";

  if (!accessToken) {
    return Response.json(
      {
        configured: false,
        platform: "tiktok",
        items: [],
        profileUrl,
        message: "TikTok feed is not configured yet.",
      },
      { status: 200 },
    );
  }

  try {
    const url = new URL("https://open.tiktokapis.com/v2/video/list/");
    url.searchParams.set(
      "fields",
      "id,title,video_description,duration,cover_image_url,embed_link,create_time",
    );

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ max_count: 6 }),
    });

    const payload = (await response.json()) as {
      data?: { videos?: TikTokVideo[] };
      error?: { message?: string; code?: string };
    };

    if (!response.ok || payload.error?.code !== "ok") {
      return Response.json(
        {
          configured: true,
          platform: "tiktok",
          items: [],
          profileUrl,
          message: payload.error?.message || "TikTok returned an error.",
        },
        { status: 502 },
      );
    }

    return Response.json({
      configured: true,
      platform: "tiktok",
      items: payload.data?.videos ?? [],
      profileUrl,
    });
  } catch {
    return Response.json(
      {
        configured: true,
        platform: "tiktok",
        items: [],
        profileUrl,
        message: "Unable to reach TikTok right now.",
      },
      { status: 502 },
    );
  }
}
