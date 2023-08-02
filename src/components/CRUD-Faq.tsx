import Joi from "joi";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input, { faqInputType } from "./utils/Input";
import Select from "./utils/Select";

const CrudFaq = () => {
  const faqObject = {
    question: "",
    type: "",
    status: "",
    answer: "",
  };
  const [useParams] = useSearchParams();
  const id = useParams.get("id");
  const [err, setErr] = useState<faqInputType | null>(faqObject);
  const [faq, setFaq] = useState({
    ...faqObject,
    type: "Main",
    status: "Active",
  });
  const schema = Joi.object({
    question: Joi.string(),
    answer: Joi.string(),
  });

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

  const handleSubmit = (e: Event | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {} as faqInputType;
    const { error } = schema.validate(faq, { abortEarly: false });
    if (error) {
      for (let index = 0; index < error.details.length; index++) {
        errors[error.details[index].path[0] as keyof typeof faq] =
          error.details[index].message;
      }
      return setErr(errors);
    }
    console.log("NO error");
  };

  return (
    <div className="bg-black w-full min-h-screen px-4 py-8 text-white">
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
          listArr={[
            "Main",
            "Deposit",
            "Fiat Deposit",
            "Withdrawn",
            "Buy",
            "Sell",
            "Coin",
            "Wallet",
            "Trade",
            "P2P",
            "Gift Card",
          ]}
          label={"FAQ Type"}
          name={"type"}
        />
        <Select
          handleChange={handleChange}
          listArr={["Active", "Deactive"]}
          label={"Activation Status"}
          name={"status"}
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
            className="outline-none resize-none w-[50%] bg-transparent border-b-2"
          ></textarea>
          {err?.answer && (
            <div className="text-sm text-red-400">{err.answer}</div>
          )}
        </div>
        <button
          className="bg-[#e7353511] hover:bg-blue-800 px-8 py-2 rounded-lg my-2 font-bold text-lg"
          type="submit"
        >
          {id ? <span>Edit</span> : <span>Publish</span>}
        </button>
      </form>
    </div>
  );
};

export default CrudFaq;
