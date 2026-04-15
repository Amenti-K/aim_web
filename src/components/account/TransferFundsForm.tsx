"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transferSchema, TransferFormType } from "../schema/account.schema";
import {
  IAccountTransfer,
  IAccountDetail,
} from "../interface/interface.account";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import NumericField from "../forms/fields/NumericField";
import SelectField from "../forms/fields/SelectField";

interface Props {
  fromAccountId: string;
  accounts: IAccountDetail[];
  onTransfer: (data: IAccountTransfer) => void;
  loading?: boolean;
}

export default function TransferFundsForm({
  fromAccountId,
  accounts,
  onTransfer,
  loading = false,
}: Props) {
  const form = useForm<TransferFormType>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      toAccountId: "",
      amount: 0,
    },
  });

  const onSubmit = (formData: TransferFormType) => {
    onTransfer({
      fromAccountId,
      toAccountId: formData.toAccountId,
      amount: formData.amount,
    });
  };

  const otherAccounts = accounts.filter((acc) => acc.id !== fromAccountId);

  const accountOptions = otherAccounts.map((acc) => ({
    label: `${acc.name} (${Number(acc.balance).toLocaleString()} ETB)`,
    value: acc.id,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          control={form.control}
          name="toAccountId"
          label="To Account"
          placeholder="Select destination account"
          options={accountOptions}
        />

        <NumericField
          control={form.control}
          name="amount"
          label="Amount"
          placeholder="0.00"
          type="number"
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Transfer Funds
          </Button>
        </div>
      </form>
    </Form>
  );
}
