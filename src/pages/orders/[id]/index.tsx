import React from "react";
import NextLink from "next/link";
import { Input } from "@/components/shadcn/ui/input";
import { useForm } from "react-hook-form";
import { Order } from "@prisma/client";
import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/utils/api";

const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>({});
  const ordersApi = api.orders.createOne.useMutation();

  const onSubmit = (data: Order) => {
    console.log(data);
    ordersApi.mutate(data);
  };
  return (
    <>
      <div className="container mx-auto flex items-center justify-between">
        <NextLink href={"/orders/"}>Go back</NextLink>
        <h1 className="text-3xl font-bold">Order Details</h1>
      </div>
      <div className="grid min-h-[95dvh] place-items-center">
        <div className="container mx-auto">
          <form
            className="mx-auto flex max-w-md flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label htmlFor="customerName">Customer Name</label>
              <Input
                id="customerName"
                type="text"
                {...register("customerName", {
                  required: "Customer Name is required",
                })}
              />
              {errors.customerName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.customerName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="customerEmail">Customer Email</label>
              <Input
                id="customerEmail"
                type="email"
                {...register("customerEmail", {
                  required: "Email is required",
                })}
              />
              {errors.customerEmail && (
                <span className="text-xs font-medium text-red-500">
                  {errors.customerEmail.message}
                </span>
              )}
            </div>
            <div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;
