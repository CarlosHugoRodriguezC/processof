import React, { useState } from "react";
import NextLink from "next/link";
import { Input } from "@/components/shadcn/ui/input";
import { useForm } from "react-hook-form";
import { Order, Stage } from "@prisma/client";
import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/utils/api";
import { StageForm } from "@/components/orders";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export type OrderForm = Order & {
  stages: Stage[];
};

const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({});
  const [stages, setStages] = useState<Partial<Stage>[]>([]);
  const ordersApi = api.orders.createOne.useMutation();

  const handleAddStage = () => {
    setStages((prev) => [
      ...prev,
      { name: `Stage ${stages.length}`, description: "" },
    ]);
  };

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
            {/* Stages form */}
            <div className="flex flex-col gap-3">
              {stages.map((stage, index) => (
                <StageForm
                  key={index}
                  stage={stage}
                  stageIndex={index}
                  register={register}
                  errors={errors.stages?.[index]}
                />
              ))}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={handleAddStage}
                >
                  Add Stage
                </Button>
              </div>
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

export default index;
