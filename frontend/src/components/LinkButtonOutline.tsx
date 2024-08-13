import React from "react";

interface LinkButtonOutlineProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const LinkButtonOutline: React.FC<LinkButtonOutlineProps> = ({
  label,
  href = "#",
  onClick,
  className,
}) => {
  const baseStyles = "inline-flex items-center text-xs font-semibold uppercase tracking-wider text-white text-slate-800 transition-colors duration-200";
  return (
    <a href={href} onClick={onClick} className={`${baseStyles} ${className}`}>
      {label}
    </a>
  );
};

export default LinkButtonOutline;
