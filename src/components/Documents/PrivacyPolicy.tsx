import { useEffect, useState } from "react";
import { editOrCreate, getAll } from "../../api/DocumentApis/PrivacyPolicyApi";
import Editor from "./Document-Editor";
import { useNavigate } from "react-router-dom";
import { ErrorDisplayPage } from "../ErrorDisplayPage";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const getData = async () => {
    const result = await getAll();

    if (result.status === 200 && result.data.data.length > 0) {
      setType("Edit");
      setNotes(result.data.data[0].notes);
    } else {
      setType("Publish");
      setNotes("");
      console.log("Error is ", result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePublish = async () => {
    const result = await getAll();

    if (result.status === 200) {
      try {
        if (result.data.data.length < 1) {
          await editOrCreate({ notes: notes }, "");
          setMessage("Privacy Policy published sucessfully!");
          setTimeout(() => {
            setMessage(null);
            navigate("/admin/documents");
          }, 3000);
        } else {
          await editOrCreate({ notes: notes }, result.data.data[0]._id);
          setMessage("Privacy Policy edited sucessfully!");
          setTimeout(() => {
            setMessage(null);
            navigate("/admin/documents");
          }, 3000);
        }
      } catch (error: any) {
        setMessage(
          String(error.response?.data.message || "unidentified error")
        );
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } else {
      console.log("An error occured ", result);
    }
  };

  return (
    <div className="bg-[#444] py-10">
      {message && (
        <ErrorDisplayPage color={"text-blue-400"} message={message} />
      )}
      <div className="">
        <div className="text-center text-white text-[22px] font-semibold">
          Privacy And Policy
        </div>
      </div>
      <Editor setDesc={setNotes} desc={notes} type={type} />
      { type && <div
        onClick={handlePublish}
        className="bg-blue-500 hover:bg-blue-600 text-white mx-auto cursor-pointer min-w-[80%] lg:w-[50%] py-2 px-3 font-bold text-center rounded-md"
      >
        {type}
      </div>}
    </div>
  );
};

export default PrivacyPolicy;
