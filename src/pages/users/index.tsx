import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/utils/api";
import { User } from "@prisma/client";
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

export default UsersPage;
