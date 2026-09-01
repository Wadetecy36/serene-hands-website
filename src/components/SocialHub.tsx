import { useEffect, useState } from "react";
import { ArrowUpRight, Camera, Music2, Play } from "lucide-react";
import { motion } from "framer-motion";
import { getInstagramFeed, getTikTokFeed } from "../lib/socialFeeds";
import type { InstagramItem, TikTokItem } from "../lib/socialFeeds";
import Button from "./Button";
import SectionHeading from "./SectionHeading";
import { business } from "../data/siteConfig";

export default function SocialHub() {
  const [instagram, setInstagram] = useState<InstagramItem[]>([]);
  const [tiktok, setTikTok] = useState<TikTokItem[]>([]);
  const [igConfigured, setIgConfigured] = useState(false);
  const [ttConfigured, setTtConfigured] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.allSettled([getInstagramFeed(), getTikTokFeed()]).then(([ig, tt]) => {
      if (!active) return;
      if (ig.status === "fulfilled") {
        setInstagram(ig.value.items);
        setIgConfigured(ig.value.configured);
      }
      if (tt.status === "fulfilled") {
        setTikTok(tt.value.items);
        setTtConfigured(tt.value.configured);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <section className="border-t border-blush-deep bg-cloud py-20 sm:py-28">
      <div className="serene-container">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="From Serene Hands"
            title="A little more of what we're up to."
            description="Follow along for family updates, team news, care stories and the moments that make Serene Hands feel like a community."
          />
          <div className="flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 rounded-full border border-blush-deep px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-rose" href={business.instagram} target="_blank" rel="noreferrer">
              <Camera size={16} /> Instagram <ArrowUpRight size={14} />
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-blush-deep px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-rose" href={business.tiktok} target="_blank" rel="noreferrer">
              <Music2 size={16} /> TikTok <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <SocialColumn
            label="Instagram"
            icon={<Camera size={18} />}
            configured={igConfigured}
            items={instagram}
            emptyText="Connect the Instagram API to automatically show the latest posts here."
            profileUrl={business.instagram}
            renderItem={(item) => (
              <a href={item.permalink || business.instagram} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-3xl bg-blush">
                <div className="aspect-[4/3] overflow-hidden bg-blush-deep">
                  {(item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url || item.thumbnail_url) ? <img src={(item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url || item.thumbnail_url)} alt={item.caption || "Serene Hands Instagram post"} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" /> : null}
                </div>
                <div className="p-5"><p className="line-clamp-2 text-sm leading-6 text-ink-soft">{item.caption || "See the latest from Serene Hands on Instagram."}</p></div>
              </a>
            )}
          />

          <SocialColumn
            label="TikTok"
            icon={<Music2 size={18} />}
            configured={ttConfigured}
            items={tiktok}
            emptyText="Connect TikTok Display API to automatically show the latest videos here."
            profileUrl={business.tiktok}
            renderItem={(item) => (
              <a href={item.embed_link || business.tiktok} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-3xl bg-ink">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
                  {item.cover_image_url ? <img src={item.cover_image_url} alt={item.title || "Serene Hands TikTok video"} className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03]" loading="lazy" /> : null}
                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-rose"><Play size={17} fill="currentColor" /></span>
                </div>
                <div className="p-5"><p className="line-clamp-2 text-sm leading-6 text-white/70">{item.title || item.video_description || "Watch the latest from Serene Hands on TikTok."}</p></div>
              </a>
            )}
          />
        </div>
      </div>
    </section>
  );
}

type ColumnProps<T> = {
  label: string;
  icon: React.ReactNode;
  configured: boolean;
  items: T[];
  emptyText: string;
  profileUrl: string;
  renderItem: (item: T) => React.ReactNode;
};

function SocialColumn<T>({ label, icon, configured, items, emptyText, profileUrl, renderItem }: ColumnProps<T>) {
  return (
    <div className="rounded-[32px] border border-blush-deep bg-cream p-5 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-rose">{icon}</span><div><p className="serene-eyebrow text-blossom">{label}</p><p className="mt-1 font-display text-2xl font-semibold text-ink">Latest from us</p></div></div>
        <a href={profileUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-rose hover:underline">View profile</a>
      </div>
      {items.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">{items.slice(0, 4).map((item, index) => <motion.div key={String((item as {id?: string}).id || index)} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.04}}>{renderItem(item)}</motion.div>)}</div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-blush-deep bg-cloud p-7">
          <p className="text-sm leading-6 text-ink-soft">{configured ? "The feed is connected, but there are no public items to display yet." : emptyText}</p>
          <Button to={profileUrl} variant="ghost" className="mt-4">Open {label}</Button>
        </div>
      )}
    </div>
  );
}
