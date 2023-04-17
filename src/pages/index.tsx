import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/utils/api";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React from "react";

const HomePage: NextPage = () => {
  const users = api.users.getAll.useQuery({});

  return (
    <>
      <Button onClick={() => signIn()}>SingIn</Button>
      <ul>
        {users.data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
