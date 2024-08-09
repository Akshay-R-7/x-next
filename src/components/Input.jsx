"use client";

import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";

import React from "react";

export default function Input() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img
        src={session.user.image}
        alt="user img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-90"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          placeholder="Whats happening"
          rows="2"
          className="w-full border-none outline-none p-3 tracking-wide min-h-[50px] text-gray-700"
        />
        <div className="flex items-center justify-between p-2.5">
          <HiOutlinePhotograph className="rounded-full cursor-ponter h-10 w-10 p-2 text-sky-500 hover:bg-sky-100" />
          <button className="bg-blue-400 rounded-full px-4 py-1.5 font-bold shadow-md text-white border cursor-pointer opacity-95 hover:opacity-80 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
