/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import parser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import ReplySeeSupport from "./ReplySeeSupport";
import Joi from "joi";
import { createChatApi } from "../../api/chatApi";
import { getSupportByIdApi } from "../../api/supportApi";
import { chatsTypes, messageTypes } from "../types";
import SupportSelect from "../utils/SupportSelect";
import { io } from "socket.io-client";
import moment from "moment";

type errorType = { file: string; response: string };

const SeeSupport = () => {
  const [imgName, setImgName] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [err, setErr] = useState({} as errorType);
  const [reply, setReply] = useState({
    file: "",
    status: "PENDING",
  });
  const [chats, setChats] = useState({} as chatsTypes);
  const [sentNewMsg, setSentNewMsg] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const { id } = useParams();
  const scroll = useRef<HTMLDivElement | null>(null);

  const schema = Joi.object({
    file: Joi.any().allow("").optional(),
    status: Joi.string().min(3),
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
        await createChatApi({ ...reply, response: editorValue }, chats._id);
        setSentNewMsg(editorValue);
      } catch (error: any) {
        console.log("New Error: ", error.response);
      }
    }
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    // scroll.current?.scrollIntoView);
  }, [sentNewMsg]);

  useEffect(() => {
    if (id) {
      const getChats = async () => {
        try {
          const { data } = await getSupportByIdApi(id);

          setReply({ ...reply, status: data.data.status });
          setChats(data.data);
        } catch (error: any) {
          console.log("New Error is", error.response);
        }
      };
      getChats();
    }
  }, []);

  // Connect to socket.io
  useEffect(() => {
    const { connect }: any = io;
    const newSocket: any = connect("http://localhost:5050");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  // add user to socket.io
  useEffect(() => {
    if (!socket) return;

    if (Object.keys(chats).length > 0) {
      socket.emit("addNewUser", `${chats?._id + chats?.email}`);
      socket.on("getOnlineUsers", (res: any) => setOnlineUsers(res));
    }

    return () => socket.off("getOnlineUsers");
  }, [socket, chats]);

  // send message to the admin
  useEffect(() => {
    if (socket === null) return;

    const newChats: any = {
      ...reply,
      msg: editorValue,
      createdAt: new Date().toUTCString(),
      fromAdmin: true,
      email: chats?.email,
      receiverId: chats?._id,
    };
    setChats((prev) => ({ ...prev, messages: [...prev.messages, newChats] }));

    socket.emit("sendMessage", newChats);
  }, [sentNewMsg]);

  // recieve message from user
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res: messageTypes) => {
      setChats((prev) => ({ ...prev, messages: [...prev.messages, res] }));
    });

    return () => socket.off("getMessage");
  }, [socket]);

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
                ref={scroll}
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
                    <div className="text-[12px] font-semibold">
                      {moment(createdAt).calendar()}
                    </div>
                  </div>
                  <div className="text-[12px] font-bold text-[#191942]">
                    {fromAdmin ? "Admin Message" : username}
                  </div>
                </div>
                <p className="text-[14px]">{parser(msg)}</p>
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
          setValue={setEditorValue}
          value={editorValue}
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
