import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import { api } from "@/utils/api";
import { Order, ProductionLine, User } from "@prisma/client";
import DataTable, { TableColumn } from "react-data-table-component";
import { appRouter } from "@/server/api/root";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { getSession } from "next-auth/react";
import { ssgInit } from "@/server/api/ssg-init";

type OrderColumns = Order & {
  productionLine: ProductionLine;
  createdBy: User;
  updatedBy: User;
};

const ORDER_COLUMNS: TableColumn<OrderColumns>[] = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Customer",
    selector: (row) => row.customerName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.customerEmail,
    sortable: true,
  },
  {
    name: "Production Line",
    selector: (row) => row.productionLine.name,
  },
];

interface Props {

}

const OrdersPage = (props: InferGetServerSidePropsType<GetServerSideProps>) => {

  const ordersApi = api.orders.getAll.useQuery({});

  return (
    <>
      <div className="container mx-auto flex justify-between py-3">
        <h1 className="text-3xl font-bold">Orders</h1>
        <NextLink href={"/orders/new"}>Create Order</NextLink>
      </div>
      <DataTable columns={ORDER_COLUMNS} data={ordersApi.data ?? []} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const ssg = await ssgInit(session);
  
  await ssg.orders.getAll.fetch({});

  return {
    props: {
        trpcState: ssg.dehydrate(),
    },
  };
};

export default OrdersPage;
