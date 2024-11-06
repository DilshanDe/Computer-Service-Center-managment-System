import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Admin from "./pages/Admin";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Aboutus from "./pages/Aboutus";

import Contactus from "./pages/Contactus";
import Form from "./pages/Form";
import StorePage from "./pages/StorePage";
import AddCart from "./pages/AddCart";
import Checkout from "./pages/Checkout";



import AdminOrders from "./pages/AdminOrders";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import ProtectedRoute from"./pages/ProtectedRoute";
import AdminAppointments from "./pages/AdminAppointments";
import AdminContacts from "./pages/AdminContacts";

import AddProductPage from "./pages/AddProductPage";
import ProductDetails from "./pages/ProductDetails";
import AddRepairPage from "./pages/AddRepairPage";
import RepairQueue from "./pages/RepairQueue";
import RepairAndBilling from "./pages/RepairAndBilling";
import ProfilePage from "./pages/ProfilePage";
import RepairedItems from "./pages/RapairedItems";





function App() {
  

  return (
    <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/invoice" element={<Invoice/>} />
           
              <Route path="/admin"element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
              <Route path="/adminappoiment"element={
            <ProtectedRoute>
             <AdminAppointments/>
            </ProtectedRoute>
          }
        />
              <Route path="/admincontact"element={
            <ProtectedRoute>
             <AdminContacts/>
            </ProtectedRoute>
          }
        />
              <Route path="/repaireditems"element={
            <ProtectedRoute>
             <RepairedItems/>
            </ProtectedRoute>
          }
        />
        
              <Route path="/adminorders"element={
            <ProtectedRoute>
             <AdminOrders/>
            </ProtectedRoute>
          }
        />
              <Route path="/adminregister"element={
            <ProtectedRoute>
             <AdminRegister/>
            </ProtectedRoute>
          }
        />
              <Route path="/adminproduct"element={
            <ProtectedRoute>
             <AddProductPage/>
            </ProtectedRoute>
          }
        />
        
              <Route path="/addrepairpage"element={
            <ProtectedRoute>
             <AddRepairPage/>
            </ProtectedRoute>
          }
        />
              <Route path="/repairqueue"element={
            <ProtectedRoute>
             <RepairQueue/>
            </ProtectedRoute>
          }
        />
              <Route path="/repair&billing"element={
            <ProtectedRoute>
             <RepairAndBilling/>
            </ProtectedRoute>
          }
          
        />

        
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/sign" element={<Signup/>} />
              <Route path="/aboutus" element={<Aboutus/>} />  
              <Route path="/contactus" element={<Contactus/>} />
              <Route path="/storepage" element={<StorePage/>} />
              <Route path="/cart" element={<AddCart/>} />
              <Route path="/form" element={<Form/>} />
              <Route path="/checkout" element={<Checkout/>} />
              <Route path="/adminlogin" element={<AdminLogin/>} />
              <Route path="/adminregister" element={<AdminRegister/>} />
              <Route path="/productdetails/:name" element={<ProductDetails/>} />
              <Route path="/profile" element={<ProfilePage/>} />
              
             
              

              
              

             
              
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
