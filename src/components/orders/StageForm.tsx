import { Order, Stage } from "@prisma/client";
import React, { FC } from "react";
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { OrderForm } from "@/pages/admin/orders/[id]";
import { number } from "zod";

interface Props {
  // uitility type to get all stage fields as required except id, id should be optional
  stage: Partial<Stage>;
  stageIndex: number;
  register: UseFormRegister<OrderForm>;
  errors?: Merge<FieldError, Merge<FieldError, FieldErrorsImpl<Stage>>>;
}

export const StageForm: FC<Props> = (props) => {
  const { stage, stageIndex, register, errors } = props;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-right">Stage {stageIndex}</p>
      <div className="flex flex-col gap-1">
        <label htmlFor="stage-name">Stage Name</label>
        <Input
          type="text"
          id="stage-name"
          {...register(`stages.${stageIndex}.name`, {
            required: "Stage name is required",
            value: stage.name,
          })}
        />

        {errors?.name && (
          <span className="text-xs font-medium text-red-500">
            {errors.name?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="stage-description">Stage Description</label>
        <Input
          type="text"
          id="stage-description"
          {...register(`stages.${stageIndex}.description`)}
        />

        {errors?.description && (
          <span className="text-xs font-medium text-red-500">
            {errors.description?.message}
          </span>
        )}
      </div>
    </div>
  );
};
