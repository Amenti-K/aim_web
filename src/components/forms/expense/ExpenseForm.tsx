"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useFetchAccountSelector } from "@/api/account/api.account";
import NumericField from "@/components/forms/fields/NumericField";
import SelectField from "@/components/forms/fields/SelectField";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import TextAreaField from "@/components/forms/fields/TextAreaField";
import { Button } from "@/components/ui/button";
import { ExpenseFormValues, expenseSchema } from "./expense.schema";

interface Props {
  initialData?: Partial<ExpenseFormValues> | null;
  onSubmit: (values: ExpenseFormValues) => void;
  onCancel?: () => void;
  isPending?: boolean;
  submitLabel?: string;
}

export default function ExpenseForm({
  initialData,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = "Save",
}: Props) {
  const { control, handleSubmit, reset } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      paymentItems: [],
      cashItem: { amount: 0 },
    },
  });
  const { data: accounts } = useFetchAccountSelector();
  const { fields, append, remove } = useFieldArray({ control, name: "paymentItems" });
  const paymentItems = useWatch({ control, name: "paymentItems" }) ?? [];
  const cashAmount = useWatch({ control, name: "cashItem.amount" }) ?? 0;

  useEffect(() => {
    if (!initialData) return;
    reset({
      description: initialData.description ?? "",
      paymentItems: initialData.paymentItems ?? [],
      cashItem: initialData.cashItem ?? { amount: 0 },
    });
  }, [initialData, reset]);

  const accountOptions = useMemo(() => {
    if (!Array.isArray(accounts?.data)) return [];
    return accounts.data.map((item: any) => ({
      value: item.id,
      label: `${item.name} (${item.bank ?? "Cash"})`,
    }));
  }, [accounts]);

  const total =
    paymentItems.reduce((sum, item) => sum + Number(item?.amount || 0), 0) + Number(cashAmount || 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextAreaField
        name="description"
        control={control}
        label="Description"
        placeholder="Expense description"
      />

      <div className="space-y-3 rounded-md border p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium">Bank payments</p>
          <Button type="button" variant="outline" size="sm" onClick={() => append({ accountId: "", amount: 0 })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_44px]">
            <SelectField
              name={`paymentItems.${index}.accountId`}
              control={control}
              label="Account"
              options={accountOptions}
            />
            <NumericField name={`paymentItems.${index}.amount`} control={control} label="Amount" />
            <Button type="button" variant="destructive" size="icon" className="mt-8" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="rounded-md border p-4">
        <NumericField name="cashItem.amount" control={control} label="Cash payment" />
      </div>

      <div className="rounded-md bg-muted p-4 text-sm">
        Total: <span className="font-bold">Br {Number(total).toLocaleString()}</span>
      </div>

      <div className="flex gap-3">
        <SubmitButton title={submitLabel} loading={isPending} />
        {onCancel && (
          <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
