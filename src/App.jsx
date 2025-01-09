
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Template from "./page/template";
import TodoList from "./page/todoList";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Template />} />
          <Route path="/todoList" element={<TodoList />} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
