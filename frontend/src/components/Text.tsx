import React from "react";

type TextType = "title" | "subtitle" | "description" | "price" | "oldPrice" | "default";

interface TextProps {
  type?: TextType;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  type = "default",
  variant = "primary",
  children,
  className,
}) => {
  const baseClasses = variant === "primary" ? "mb-2 font-sans uppercase text-slate-800" : "mb-2 font-sans uppercase text-white";

  const typeClasses = {
    title: "text-2xl font-bold",
    subtitle: "text-md font-semibold",
    description: "text-xs",
    price: "text-2xl font-bold",
    oldPrice: "text-sm line-through",
    default: "text-base",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>
      {children}
    </div>
  );
};

export default Text;
