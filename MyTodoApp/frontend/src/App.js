import Header from "./components/Header";
import "./App.css";
import NotesListPages from "./pages/NotesListPages";
import { Route, HashRouter, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <HashRouter>
      <div className="container dark" >
        <div className="app">
        <Header />
        <Routes>
          <Route path="/" exact element={<NotesListPages />} />
          <Route path="/note/:id/" element={<NotePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
