import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Layout = () => {
  const location = useLocation();
  const { isPatient, isDoctor, isAdmin, isReceptionist, user } = useAuth();
  const menuItems = [
    { path: "/", label: "Home" },
    ...(isAdmin ? [{ path: "/admin/users", label: "Users" }] : []),
    ...(isAdmin ? [{ path: "/clinic", label: "Clinic" }] : []),
    ...(isPatient ? [{ path: "/appointment", label: "Appointment" }] : []),
    ...(isDoctor || isReceptionist ? [{ path: "/queue", label: "Queue" }] : []),
    ...(isDoctor || isReceptionist ? [{ path: "/priscription", label: "Priscription" }] : []),
    ...(isPatient ? [{ path: "/myprescriptions", label: "MYPriscription" }] : []),
    ...(isDoctor ? [{ path: "/report", label: "Add Report" }] : []),
    ...(isPatient ? [{ path: "/myreports", label: "My Reports" }] : []),
  ];
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Panel */}
      <div className="main-panel">
        <header className="app-header">
          <h3>{user?.name || "Guest"}({user?.role || "user"})</h3>
          <h4> welcome here!!</h4>
          <Link to="/login" className="btn-logout">Logout</Link>
        </header>

        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
