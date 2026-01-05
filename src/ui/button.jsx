import React from "react";

const Button = ({
  children,
  className = "",
  size = "default",
  variant = "default",
  asChild = false,
  ...props
}) => {
  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };

  const classes = `inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (asChild) {
    // When asChild is true, we apply the classes to the child element
    return React.cloneElement(children, {
      className: `${children.props.className || ""} ${classes}`.trim(),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export { Button };
