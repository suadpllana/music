
import Home from './Home';
import {ToastContainer} from "react-toastify"
function App() {
 

  return (
    <>
  <Home/>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
