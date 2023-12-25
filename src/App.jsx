import "./App.css";
import { ColorProvider } from "./context/ColorContext";
import Route from "./components/Route"

function App() {
  return (
    <ColorProvider>
      <Route />
    </ColorProvider>
  );
}

export default App;
