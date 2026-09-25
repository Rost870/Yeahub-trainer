import Footer from "@/Footer/Footer";
import Header from "@/Header/Header";
import { Outlet } from "react-router-dom";
import './BaseLayout.module.css'
function BaseLayout(){
  return(
    <div className='App'>
      <Header />
      <main className="App_content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default BaseLayout;