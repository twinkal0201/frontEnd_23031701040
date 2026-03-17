

// import React, { useEffect, useState } from 'react';
// import { getAllUsers } from '../services/AdminServices';
// import { useNavigate } from 'react-router-dom';

// const AdminUsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     const res = await getAllUsers();
//     if (!res.error) {
//       setUsers(res);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);


//   return (
//     <div>
//       {/* Top Bar */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <h2>Users</h2>
//         <button
//           onClick={() => navigate('/admin/adduser')}
//           style={{
//             padding: '8px 15px',
//             backgroundColor: '#28a745',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px'
//           }}
//         >
//           + Add User
//         </button>
//       </div>

//       {/* Table */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Role</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.role}</td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminUsersList;

import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/AdminServices';
import { useNavigate } from 'react-router-dom';

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error ,setError] =useState("");

  const fetchUsers = async () => {
    const res = await getAllUsers();
    if (res.error) {
      setError(res.message);
    }
    else{
      setUsers(res || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      
      {/* Top Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0 }}>Users</h2>

        <button
          onClick={() => navigate('/admin/adduser')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ 
          background: '#fff', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <table 
            style={{ 
              width: '100%', 
              borderCollapse: 'collapse' 
            }}
          >
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={user.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
                  }}
                >
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{user.phone}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      backgroundColor:'#6c757d',
                      color: '#fff',
                      fontSize: '12px'
                    }}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Reusable styles
const thStyle = {
  textAlign: 'left',
  padding: '12px',
  borderBottom: '1px solid #ddd',
  fontSize: '14px'
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  fontSize: '14px'
};

export default AdminUsersList;