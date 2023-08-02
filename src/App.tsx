import { Route, Routes } from "react-router-dom";
import { AdminPanel, Dashboard } from "./components";
import Blog from "./components/Blog";
import CrudBlog from "./components/CRUD-Blog";
import CrudFaq from "./components/CRUD-Faq";
import Faqs from "./components/Faqs";
import Login from "./components/Login";
import { NotfoundPage } from "./components/NotfoundPage";
import { RequireAuth } from "./utils/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotfoundPage />} />

      <Route
        path="/admin/"
        element={
          <RequireAuth>
            <AdminPanel />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="faq" element={<Faqs />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/create-blog" element={<CrudBlog />} />
        <Route path="blog/edit" element={<CrudBlog />} />
        <Route path="faq/create-faq" element={<CrudFaq />} />
        <Route path="faq/edit" element={<CrudFaq />} />
      </Route>
    </Routes>
  );
};

export default App;
