// AdminOptions.jsx
import { useNavigate } from "react-router-dom";

const AdminOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-options">
      <h2>Welcome Admin</h2>
      <button onClick={() => navigate("/chatvat")}>💬 Chat</button>
      <button onClick={() => navigate("/admin")}>📊 View User Data</button>
    </div>
  );
};

export default AdminOptions;
