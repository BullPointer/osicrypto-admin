import "./init.tsx";
import { Route, Routes } from "react-router-dom";
import { AdminPanel, Dashboard } from "./components";
import Blog from "./components/Blog";
import CrudBlog from "./components/CRUD-Blog";
import CrudFaq from "./components/CRUD-Faq";
import Faqs from "./components/Faqs";
import Login from "./components/Login";
import { NotfoundPage } from "./components/NotfoundPage";
import { RequireAuth } from "./utils/RequireAuth";
import CrudEditor from "./components/CRUD-Editor";
import Workers from "./components/Worker";
import AllWorkers from "./components/workers/AllWorkers";
import CreateWorkers from "./components/workers/CreateWorkers";
import SuspendedWorkers from "./components/workers/SuspendedWorkers";
import DeletedWorkers from "./components/workers/DeletedWorkers";
import DeleteRequests from "./components/workers/DeleteRequests";
import EmailPending from "./components/workers/EmailPending";
import PendingPhoneVerify from "./components/workers/PendingPhoneVerify";
import PrivacyPolicy from "./components/Documents/PrivacyPolicy.js";
import TermsAndConditions from "./components/Documents/TermsAndConditions.js";
import Document from "./components/Documents/Document.js";

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
        <Route path="documents" element={<Document />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="worker" element={<Workers />}>
          <Route index element={<AllWorkers />} />
          <Route path="all-workers" element={<AllWorkers />} />
          <Route path="create-workers" element={<CreateWorkers />} />
          <Route path="suspended-workers" element={<SuspendedWorkers />} />
          <Route path="deleted-workers" element={<DeletedWorkers />} />
          <Route path="delete-requests" element={<DeleteRequests />} />
          <Route path="email-pending" element={<EmailPending />} />
          <Route path="pending-phone-verify" element={<PendingPhoneVerify />} />
        </Route>
        <Route path="blog/create-blog" element={<CrudBlog />} />
        <Route path="blog/edit" element={<CrudBlog />} />
        <Route path="faq/create-faq" element={<CrudFaq />} />
        <Route path="faq/edit" element={<CrudFaq />} />

        <Route path="editor" element={<CrudEditor />} />
        <Route path="editor/:editPath" element={<CrudEditor />} />
      </Route>
    </Routes>
  );
};

export default App;
