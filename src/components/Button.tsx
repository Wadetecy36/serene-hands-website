import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  icon?: ReactNode;
};

type ButtonAsLink = BaseProps & {
  to: string;
  href?: never;
  onClick?: never;
  type?: never;
};

type ButtonAsAnchor = BaseProps & {
  href: string;
  to?: never;
  onClick?: never;
  type?: never;
  target?: string;
  rel?: string;
};

type ButtonAsButton = BaseProps & {
  onClick?: () => void;
  type?: "button" | "submit";
  to?: never;
  href?: never;
};

type Props = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

const variantStyles: Record<string, string> = {
  primary:
    "bg-plum text-cloud hover:bg-plum-deep shadow-card",
  secondary:
    "bg-coral text-cloud hover:opacity-90 shadow-card",
  ghost:
    "bg-transparent text-plum border border-plum/25 hover:bg-plum/5",
};

const sizeStyles: Record<string, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button(props: Props) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    icon,
  } = props;

  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={classes}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
      {icon}
    </button>
  );
}
