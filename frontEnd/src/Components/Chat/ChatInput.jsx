import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiAttachmentLine } from "react-icons/ri";
import imageCompression from "browser-image-compression";
import {
  AddImageMessage,
  AddMessageContent,
  AddSendingMessageContent,
  RemoveMessageContent,
} from "../../Redux/Slices/MessageSlice";
import socket from "../../Config/socket";
import axios from "axios";

function ChatInput() {
  const attachmentRef = useRef();
  const { messageContent } = useSelector((state) => state.MessageInfo);
  const { chatId, connecetionId } = useSelector((state) => state.ChatInfo);

  const dispatch = useDispatch();

  const handelImageAttachment = async (e) => {
    try {
      const imageFile = e.target.files[0];

      //conver image size in kB
      const imageSize = Math.round(imageFile.size / 1024);

      // more than 1.5Mb not allow
      if (imageSize > 1536) {
        console.log("more than 1.5MB is not allow");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      // file comression
      const compressedFile = await imageCompression(imageFile, options);

      (async () => {
        const formData = new FormData();
        formData.append("content", compressedFile);
        formData.append("chatId", chatId);
        formData.append("receiverId", connecetionId);

        try {
          const res = await axios.post("api/v1/chat/sendImage", formData, {
            header: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      })();

      // console.log(compressedFile.size);
      const reader = new FileReader();

      reader.onload = () => {
        const imageContent = reader.result;

        // imageContent &&
        // socket.emit("send_image", { chatId, content: imageContent });
        dispatch(AddImageMessage(imageContent));
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[72px] flex justify-center items-center gap-1 pb-2 bg-white">
      {/* input section */}
      <div className=" w-full h-full flex justify-center items-center border-2 border-s-slate-200 rounded ">
        {/* write messages */}
        <input
          type="text"
          value={messageContent}
          className=" flex-1 h-full px-2 focus:outline-none "
          placeholder="Message..."
          onChange={(e) => {
            e.preventDefault();
            dispatch(AddMessageContent(e.target.value));
          }}
          onFocus={() => {
            socket.emit("typing", { chatId });
          }}
          onBlur={() => {
            socket.emit("stop_typing", { chatId });
          }}
        />

        {/* image attachment */}
        <span className="px-2  h-full flex items-center">
          <input
            ref={attachmentRef}
            type="file"
            className="hidden"
            onChange={handelImageAttachment}
          />
          <RiAttachmentLine
            className="size-7 text-slate-400 cursor-pointer"
            onClick={() => {
              attachmentRef.current?.click();
            }}
          />
        </span>
      </div>

      {/* send message button */}
      <button
        className="w-1/5 h-full md:bg-black  bg-[#ff3131] text-white text-xl font-bold rounded "
        onClick={() => {
          if (messageContent.length > 0) {
            dispatch(AddSendingMessageContent(messageContent));
            dispatch(RemoveMessageContent());
          }
        }}
      >
        send
      </button>
    </div>
  );
}

export default ChatInput;
