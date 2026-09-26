import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Outlet } from "react-router-dom";
import './BaseLayout.css'
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