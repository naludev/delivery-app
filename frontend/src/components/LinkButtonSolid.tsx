import React from "react";

interface LinkButtonSolidProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const LinkButtonSolid: React.FC<LinkButtonSolidProps> = ({
  label,
  href = "#",
  onClick,
  className,
}) => {
  const baseStyles = "inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring";
  return (
    <a href={href} onClick={onClick} className={`${baseStyles} ${className}`}>
      {label}
    </a>
  );
};

export default LinkButtonSolid;
