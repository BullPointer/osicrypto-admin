import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input, { faqInputType } from "./utils/Input";
import Select from "./utils/Select";
import { createFaqApi, editByIdApi, getFaqByIdApi } from "../api/FaqApi";
import { ErrorDisplayPage } from "./ErrorDisplayPage";
import { faqListA, faqListB } from "./CRUD-Data";

const CrudFaq = () => {
  const faqObject = {
    question: "",
    type: "",
    status: "true",
    answer: "",
  };
  const [useParams] = useSearchParams();
  const navigate = useNavigate();
  const id = useParams.get("id");
  const [faqMessage, setFaqMessage] = useState<string | null>(null);
  const [err, setErr] = useState<faqInputType | null>(null);
  const [faq, setFaq] = useState({
    ...faqObject,
    type: "Main",
  });
  const schema = Joi.object({
    question: Joi.string(),
    answer: Joi.string(),
    status: Joi.string(),
    type: Joi.string(),
  });

  const getBlogById = async () => {
    if (id) {
      const response = await getFaqByIdApi(id);
      if (response.status == 200) {
        setFaq({
          ...faq,
          question: response.data.data.question,
          answer: response.data.data.answer,
          status: String(response.data.data.status),
          type: response.data.data.type,
        });
      }
    }
  };

  useEffect(() => {
    getBlogById();
  }, []);

  const handleChange = ({
    target,
  }:
    | Event
    | React.ChangeEvent<
        HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
      >) => {
    const { name, value } = target as HTMLInputElement | HTMLTextAreaElement;

    setFaq({ ...faq, [name]: value });
  };

  const handleSubmit = async (e: Event | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errors: any = {};
    const { error } = schema.validate(faq, { abortEarly: false });
    if (error) {
      for (let index = 0; index < error.details.length; index++) {
        errors[error.details[index].path[0] as keyof typeof faq] =
          error.details[index].message;
      }
      return setErr(errors);
    }
    if (id) {
      try {
        const response = await getFaqByIdApi(id);
        const compareObj: faqInputType = {
          ...faq,
          question: response.data.data.question,
          type: response.data.data.category,
          status: response.data.data.status,
          answer: response.data.data.answer,
        };

        let editedBlog: any = [];
        for (const key in faq) {
          if (faq.hasOwnProperty(key) && compareObj.hasOwnProperty(key)) {
            if (
              faq[key as keyof faqInputType] !==
              compareObj[key as keyof faqInputType]
            ) {
              const reqObj: any = {};

              reqObj["key"] = key;
              reqObj["value"] = faq[key as keyof faqInputType];
              editedBlog.push(reqObj);
            }
          }
        }

        await editByIdApi(editedBlog, id);

        setErr(null);
        setFaqMessage("FaQ edited sucessfully!");
        setTimeout(() => {
          setFaqMessage(null);
          navigate("/admin/faq");
        }, 3000);
      } catch (error) {
        console.log(error);

        setFaqMessage(
          String(
            "An unexpected error occured, speak with your developer for more details"
          )
        );
        setTimeout(() => {
          setFaqMessage(null);
        }, 3000);
      }
    } else {
      try {
        await createFaqApi(faq);

        setErr(null);
        setFaqMessage("FaQ published sucessfully!");
        setTimeout(() => {
          setFaqMessage(null);
          navigate("/admin/faq");
        }, 3000);
      } catch (error: any) {
        setFaqMessage(String(error.response?.data.message || error.message));
        setTimeout(() => {
          setFaqMessage(null);
        }, 3000);
      }
    }
  };

  return (
    <div className="bg-black w-full min-h-screen px-4 py-8 text-white">
      {faqMessage && (
        <ErrorDisplayPage color={"text-blue-400"} message={faqMessage} />
      )}
      <div className="font-semibold text-2xl text-white py-2 border-b">
        Create ( <span className="opacity-80">FAQ</span> )
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="w-full p-5 rounded-lg border mt-8 mb-2"
      >
        <Input
          onChange={handleChange}
          objectValue={faq}
          label="Question"
          type="text"
          name="question"
        />
        {err?.question && (
          <div className="text-sm text-red-400">{err.question}</div>
        )}

        <Select
          handleChange={handleChange}
          listArr={faqListA}
          label={"FAQ Type"}
          name={"type"}
          value={faq.type}
        />
        <Select
          handleChange={handleChange}
          listArr={faqListB}
          label={"Activation Status"}
          name={"status"}
          value={faq.status}
        />

        <div className="flex flex-col justify-start items-start w-full">
          <label
            className="text-white pt-5 font-semibold font-mono text-xl"
            htmlFor=""
          >
            Give answer
          </label>
          <textarea
            onChange={handleChange}
            value={faq["answer"]}
            name="answer"
            className="outline-none resize-none w-[100%] lg:w-[50%] bg-transparent border-b-2"
          ></textarea>
          {err?.answer && (
            <div className="text-sm text-red-400">{err.answer}</div>
          )}
        </div>
        <button
          className="bg-[#e7353511] hover:bg-blue-800 px-8 py-1 sm:py-2 rounded-lg my-2 font-bold text-[15px] sm:text-lg"
          type="submit"
        >
          {id ? <span>Edit</span> : <span>Publish</span>}
        </button>
      </form>
    </div>
  );
};

export default CrudFaq;
