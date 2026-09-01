import { Link } from "react-router-dom";
import { ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Service } from "../data/siteConfig";
export default function ServiceCard({service,index=0}:{service:Service;index?:number}){return <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-60px"}} transition={{duration:.45,delay:(index%3)*.06}} className="h-full">
<Link to={`/services/${service.id}`} className="group flex h-full flex-col justify-between border-b border-blush-deep py-7 transition-colors hover:border-blossom sm:min-h-[235px]">
<div><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft text-sage"><Heart size={18}/></div><h3 className="text-2xl font-semibold text-ink">{service.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">{service.shortDescription}</p></div>
<span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-rose">Explore <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></span>
</Link></motion.div>}
