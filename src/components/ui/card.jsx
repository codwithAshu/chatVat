export const Card = ({ children, className = "" }) => {
  return (
    <div className={`card shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};
