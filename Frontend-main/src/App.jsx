import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./Components/UserAdminAuth/LoginForm";
import { Register } from "./Components/UserAdminAuth/Register";
import { Home } from "./Home";
import { Blogs } from "./Blogs";
import { ContactUs } from "./ContactUs";
import { AdoptCatlog } from "./AdoptCatlog";
import { About } from "./About";
import { MyAccount } from "./myaccount";

import { AboutPet } from "./aboutpet";

import { Adaption_Verify } from "./adaption_verify";
import { ViewAdoptions } from "./ViewAdoptions";
import { GetInvolved } from "./GetInvolved";
import { Admin } from "./Admin/Admin";
import { Main } from "./Admin/Main";
import { Adopters } from "./Admin/Adopters";
import { Unadopted } from "./Admin/Unadopted";
import { Adopted } from "./Admin/Adopted";





function App() {
  const [count, setCount] = useState(0);

  return (
   <>
 
    <div>

      <Routes>
      <Route path="/adaption_verify" element={<Adaption_Verify/>}/>
      <Route path="/petinfo" element={  <AboutPet />} />
        <Route path="/myaccount" element={  <MyAccount /> } />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/adopt" element={<AdoptCatlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/view-adaptions" element={  <ViewAdoptions />} />
        <Route path="/getinvolved" element={<GetInvolved />} />
        <Route path="/main" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/history" element={<Adopters />} />
        <Route path="/unadopted" element={<Unadopted />} />
        <Route path="/adopted" element={<Adopted />} />

      </Routes>

 
    </div>
    

   </>
  );
}

export default App;
