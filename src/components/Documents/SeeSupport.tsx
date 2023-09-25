/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReplySeeSupport from "./ReplySeeSupport";
import Joi from "joi";
import { createChatApi } from "../../api/chatApi";
import { getSupportByIdApi } from "../../api/supportApi";
import { chatsTypes, messageTypes } from "../types";
import SupportSelect from "../utils/SupportSelect";

type errorType = { file: string; response: string };

const SeeSupport = () => {
  const [imgName, setImgName] = useState("");
  const [err, setErr] = useState({} as errorType);
  const [reply, setReply] = useState({
    response: "",
    file: "",
    status: "PENDING",
  });
  const [chats, setChats] = useState({} as chatsTypes);
  const [sendMsg, setSendMsg] = useState("");
  const { id } = useParams();

  const schema = Joi.object({
    file: Joi.any().allow("").optional(),
    status: Joi.string().min(3),
    response: Joi.string().min(5).allow("").optional(),
  });

  const handleChange = ({
    target,
  }: React.ChangeEvent<
    HTMLFormElement | HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
  >) => {
    const { name, value } = target;
    if (name === "file" && target instanceof HTMLInputElement && target.files) {
      setImgName(target.files[0].name);
      const file: unknown = target.files[0];
      setReply({ ...reply, [name]: file as string });
    } else {
      setReply({ ...reply, [name]: value });
    }
  };

  const handleReply = async () => {
    const errors = {} as errorType;
    const { error } = schema.validate(reply, { abortEarly: false });
    if (error) {
      for (let index = 0; index < error.details.length; index++) {
        errors[error.details[index].path[0] as keyof errorType] =
          error.details[index].message;
      }
      return setErr(errors);
    } else {
      setErr({} as errorType);
      try {
        await createChatApi(reply, chats._id);
        setSendMsg("true");
      } catch (error: any) {
        console.log("New Error: ", error.response);
      }
    }
  };

  useEffect(() => {
    if (id) {
      const getChats = async () => {
        try {
          const { data } = await getSupportByIdApi(id);
          console.log(data.data);
          setReply({ ...reply, status: data.data.status });
          setChats(data.data);
        } catch (error: any) {
          console.log("New Error is ", error.response);
        }
      };
      getChats();
    }
  }, [sendMsg]);

  return (
    <div className="min-h-screen p-10">
      <div className="flex flex-row justify-between items-start py-3 px-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <Icon
            className="text-[#9b7e7e] font-bold text-[25px]"
            icon="material-symbols:contact-support-outline"
          />
          <div className="text-[#666363] font-bold text-[18px]">
            Support Requests
          </div>
        </div>
        <Link
          to={"/admin/support-requests"}
          className="text-white font-bold hover:bg-[#5d6477] bg-[#424e64] text-[10px] py-2 px-4 rounded-md"
        >
          Back
        </Link>
      </div>
      <div className="w-[100%] md:w-[90%] lg:w-[70%] pt-5 pb-10 my-4 bg-[#fff] rounded-md">
        <div className="flex flex-col sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-2 sm:gap-0 px-10 pb-2 sm:pb-0 border-b">
          <div className="py-5">
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="font-bold text-[15px]">Ticket Subject:</span>
              <span className="font-semibold font-sans text-[15px] text-[#191942]">
                {chats?.subject}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="font-bold text-[15px]">Ticket ID:</span>
              <span className="font-semibold font-sans text-[15px] text-[#191942]">
                {chats?._id}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="font-bold text-[15px]">Created By:</span>
              <span className="font-semibold font-sans text-[15px] text-[#191942]">
                {chats?.messages && chats?.messages[0]?.room}
              </span>
            </div>
          </div>
          <div className="font-bold text-[12px] md:text-[14px] py-1 px-2 rounded-full bg-[#665050] text-white">
            {chats?.status}
          </div>
        </div>
        <div className="h-screen overflow-y-scroll flex flex-col justify-start items-start py-4 bg-[#f5f4f4]">
          {chats?.messages?.map(
            (
              { fromAdmin, msg, createdAt, username }: messageTypes,
              index: number
            ) => (
              <div
                key={index}
                className={`flex flex-col justify-center items-start gap-4 w-[70%] ${
                  !fromAdmin ? "self-start bg-[#fff]" : "self-end bg-[#f0ecec]"
                } p-3 px-5 shadow-md shadow-[#af8989] m-5 `}
              >
                <div className="w-[100%] flex flexl-row justify-between items-center gap-3">
                  <div className="flex flexl-row justify-start items-center gap-3">
                    <Icon
                      className="text-[14px] md:text-[18px]"
                      icon="fluent-mdl2:date-time-12"
                    />
                    <div className="text-[12px] font-semibold">{createdAt}</div>
                  </div>
                  <div className="text-[12px] font-bold text-[#191942]">
                    {fromAdmin ? "Admin Message" : username}
                  </div>
                </div>
                <p className="text-[14px]">{msg}</p>
              </div>
            )
          )}
        </div>
        <SupportSelect
          label={"Ticket Status"}
          handleChange={handleChange}
          list={["Pending", "Replied", "Resolved", "Closed"]}
          name="status"
          value={reply.status}
        />
        <ReplySeeSupport
          imgName={imgName}
          handleChange={handleChange}
          err={err}
        />
        <div className="flex flex-row justify-center items-center gap-3 px-2 py-5">
          <Link
            to={"/admin/support-requests"}
            className="text-white font-bold hover:bg-[#5d6477] bg-[#424e64] text-[10px] py-2 px-4 rounded-md"
          >
            Back
          </Link>
          <div
            onClick={handleReply}
            className="w-fit cursor-pointer text-white font-bold hover:bg-[#515979] bg-[#2d29ee] text-[10px] py-2 px-4 rounded-md"
          >
            Replay
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeSupport;
