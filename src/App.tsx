import "./App.css";
import Todos from "./pages/todos";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Todos />
    </>
  );
}

export default App;
