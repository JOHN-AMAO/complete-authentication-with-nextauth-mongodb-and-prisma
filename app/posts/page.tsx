"use client";
import { signOut } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <>
      {" "}
      <div>Hello users</div>
      <button onClick={() => signOut()}>Log out</button>
    </>
  );
};

export default page;
