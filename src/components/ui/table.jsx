export const Table = ({ children, className = "" }) => (
  <table className={`table table-bordered table-hover ${className}`}>{children}</table>
);

export const TableHeader = ({ children }) => (
  <thead className="table-light">{children}</thead>
);

export const TableRow = ({ children, className = "" }) => (
  <tr className={className}>{children}</tr>
);

export const TableHead = ({ children, className = "" }) => (
  <th className={`text-start ${className}`}>{children}</th>
);

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

export const TableCell = ({ children, className = "" }) => (
  <td className={className}>{children}</td>
);
