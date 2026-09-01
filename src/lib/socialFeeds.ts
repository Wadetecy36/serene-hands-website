export type InstagramItem = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

export type TikTokItem = {
  id: string;
  title?: string;
  video_description?: string;
  duration?: number;
  cover_image_url?: string;
  embed_link?: string;
  create_time?: number;
};

type FeedResponse<T> = {
  configured: boolean;
  items: T[];
  message?: string;
  profileUrl?: string;
};

export async function getInstagramFeed(): Promise<FeedResponse<InstagramItem>> {
  const response = await fetch("/api/instagram", { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("Instagram feed unavailable");
  return response.json() as Promise<FeedResponse<InstagramItem>>;
}

export async function getTikTokFeed(): Promise<FeedResponse<TikTokItem>> {
  const response = await fetch("/api/tiktok", { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("TikTok feed unavailable");
  return response.json() as Promise<FeedResponse<TikTokItem>>;
}
