import logo from "./logo.svg";
import "./App.css";
import Compiler from "./components/Compiler";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <h2 className="text-center  pb-5"> Java Online Compiler </h2>
      <Compiler />
    </>
  );
}

export default App;
