import { motion } from "framer-motion";
type Props={eyebrow?:string;title:string;description?:string;align?:"left"|"center";light?:boolean};
export default function SectionHeading({eyebrow,title,description,align="left",light=false}:Props){return <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.55}} className={`max-w-3xl ${align==="center"?"mx-auto text-center":""}`}>
{eyebrow&&<p className={`serene-eyebrow mb-4 ${light?"text-blossom-soft":"text-blossom"}`}>{eyebrow}</p>}
<h2 className={`text-balance text-[2.25rem] font-semibold leading-[1.02] sm:text-[3rem] ${light?"text-cloud":"text-ink"}`}>{title}</h2>
{description&&<p className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${align==="center"?"mx-auto":""} ${light?"text-cloud/75":"text-ink-soft"}`}>{description}</p>}
</motion.div>}
