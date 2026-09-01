/**
 * Server-side Instagram feed adapter for Vercel.
 *
 * Required Vercel environment variables:
 * - INSTAGRAM_ACCESS_TOKEN
 * - INSTAGRAM_USER_ID
 * - META_GRAPH_VERSION (example: v24.0)
 *
 * Keep these values server-side. Do NOT prefix them with VITE_.
 */

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const instagramUserId = process.env.INSTAGRAM_USER_ID;
  const graphVersion = process.env.META_GRAPH_VERSION;

  if (!accessToken || !instagramUserId || !graphVersion) {
    return Response.json(
      {
        configured: false,
        platform: "instagram",
        items: [],
        message: "Instagram feed is not configured yet.",
      },
      { status: 200 },
    );
  }

  try {
    const url = new URL(
      `https://graph.instagram.com/${graphVersion}/${instagramUserId}/media`,
    );
    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    );
    url.searchParams.set("limit", "6");
    url.searchParams.set("access_token", accessToken);

    const response = await fetch(url, { headers: { Accept: "application/json" } });
    const payload = (await response.json()) as {
      data?: InstagramMedia[];
      error?: { message?: string };
    };

    if (!response.ok) {
      return Response.json(
        {
          configured: true,
          platform: "instagram",
          items: [],
          message: payload.error?.message || "Instagram returned an error.",
        },
        { status: 502 },
      );
    }

    return Response.json({
      configured: true,
      platform: "instagram",
      items: payload.data ?? [],
    });
  } catch {
    return Response.json(
      {
        configured: true,
        platform: "instagram",
        items: [],
        message: "Unable to reach Instagram right now.",
      },
      { status: 502 },
    );
  }
}
