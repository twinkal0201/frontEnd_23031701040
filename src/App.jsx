import { useState } from 'react';
import LoginForm from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './componants/Layout';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoue from './componants/ProtectedRoute';
import Clinic from './pages/Clinic';
import Appointment from './pages/Appointment';
import Patient from './pages/Patient';
import AdminUsers from './pages/Users'; 
import AdminUsersList from './pages/Users';
import AdminAddUsers from './pages/AddUserForm';
import BookAppointment from './pages/BookAppointment';
import Queue from './pages/Queue';
import AddPrescription from './pages/Prescriptions';
import MyPrescriptions from './pages/MyPrescription';
import AddReport from './pages/AddReport';
import MyReports from './pages/MyReports';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/" element={<ProtectedRoue>
              <Layout />
            </ProtectedRoue>}>
              <Route index element={<Dashboard />} />
              <Route path="/clinic" element={<ProtectedRoue allowedRoles={["admin"]}>
                <Clinic />
              </ProtectedRoue>} />
              <Route path="/admin/users" element={<ProtectedRoue allowedRoles={["admin"]}>
                <AdminUsersList />
              </ProtectedRoue>} />
              <Route path="/admin/adduser" element={<ProtectedRoue allowedRoles={["admin"]}>
              <AdminAddUsers/>
              </ProtectedRoue>}/>
              <Route path="/book-appointment" element={<ProtectedRoue allowedRoles={["patient"]}>
              <BookAppointment/>
              </ProtectedRoue>}/>
              <Route path="/appointment" element={<ProtectedRoue allowedRoles={["patient"]}>
              <Patient/>
              </ProtectedRoue>}/>
              <Route path="/queue" element={<ProtectedRoue allowedRoles={["receptionist", "doctor"]}>
              <Queue/>
              </ProtectedRoue>}/>
              <Route path="/priscription" element={<ProtectedRoue allowedRoles={["doctor"]}>
              <AddPrescription/>
              </ProtectedRoue>}/>
              <Route path="/myprescriptions" element={<ProtectedRoue allowedRoles={["patient"]}>
              <MyPrescriptions/>
              </ProtectedRoue>}/>
              <Route path="/report" element={<ProtectedRoue allowedRoles={["doctor"]}>
              <AddReport/>
              </ProtectedRoue>}/>
              <Route path="/myreports" element={<ProtectedRoue allowedRoles={["patient"]}>
              <MyReports/>
              </ProtectedRoue>}/>
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
