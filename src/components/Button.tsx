import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type BaseProps={children:ReactNode;variant?:"primary"|"secondary"|"ghost"|"sage";size?:"md"|"lg";className?:string;icon?:ReactNode};
type ButtonAsLink=BaseProps&{to:string;href?:never;onClick?:never;type?:never};
type ButtonAsAnchor=BaseProps&{href:string;to?:never;onClick?:never;type?:never;target?:string;rel?:string};
type ButtonAsButton=BaseProps&{onClick?:()=>void;type?:"button"|"submit";to?:never;href?:never};
type Props=ButtonAsLink|ButtonAsAnchor|ButtonAsButton;
const variants={primary:"bg-rose text-cloud hover:bg-rose-deep",secondary:"bg-cloud text-rose border border-rose/20 hover:bg-blush",ghost:"bg-transparent text-rose border border-rose/25 hover:bg-rose/5",sage:"bg-sage text-cloud hover:bg-sage-deep"};
const sizes={md:"px-5 py-3 text-sm",lg:"px-7 py-4 text-base"};
export default function Button(props:Props){const {children,variant="primary",size="md",className="",icon}=props;const classes=`group inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] font-semibold tracking-[-.01em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none ${variants[variant]} ${sizes[size]} ${className}`;if("to" in props&&props.to)return <Link to={props.to} className={classes}>{children}{icon}</Link>;if("href" in props&&props.href)return <a href={props.href} target={props.target} rel={props.rel} className={classes}>{children}{icon}</a>;return <button type={props.type??"button"} onClick={props.onClick} className={classes}>{children}{icon}</button>}
