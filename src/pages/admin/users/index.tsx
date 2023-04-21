import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/utils/api";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

const USER_COLUMNS: TableColumn<User>[] = [
  {
    name: "Name",
    selector: (row) => row.name ?? "Name not provided",
  },
];

const UsersPage = () => {
  const usersApi = api.users.getAll.useQuery({});

  const handleRefresh = () => {
    usersApi.refetch();
  };

  return (
    <>
      <Button onClick={handleRefresh}>Refresh</Button>
      <DataTable columns={USER_COLUMNS} data={usersApi.data || []} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default UsersPage;
