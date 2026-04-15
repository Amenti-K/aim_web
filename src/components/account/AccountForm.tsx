"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, AccountFormData } from "../schema/account.schema";
import {
  EthiopianFinancialInstitution,
  EthiopianFinancialInstitutionArray,
} from "../interface/interface.account";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import NumericField from "@/components/forms/fields/NumericField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  data?: Partial<AccountFormData>;
  onSave: (data: AccountFormData) => void;
  mode?: "add" | "edit";
  loading?: boolean;
}

export default function AccountForm({
  data,
  onSave,
  mode = "add",
  loading = false,
}: Props) {
  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: data?.name ?? "",
      bank: data?.bank,
      branch: data?.branch ?? "",
      number: data?.number ?? "",
      balance: Number(data?.balance) ?? 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name ?? "",
        bank: data.bank,
        branch: data.branch ?? "",
        number: data.number ?? "",
        balance: Number(data.balance) ?? 0,
      });
    }
  }, [data, form]);

  const onSubmit = (formData: AccountFormData) => {
    onSave(mode === "edit" ? { ...formData, id: data?.id } : formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          control={form.control}
          name="name"
          label="Account Name"
          placeholder="e.g. CBE Saving"
        />

        <SelectField
          control={form.control}
          name="bank"
          label="Bank / Institution"
          placeholder="Select bank"
          options={EthiopianFinancialInstitutionArray}
        />

        <TextField
          control={form.control}
          name="branch"
          label="Branch (Optional)"
          placeholder="e.g. Piassa Branch"
        />

        <TextField
          control={form.control}
          name="number"
          label="Account Number (Optional)"
          placeholder="1122334455"
        />

        <NumericField
          control={form.control}
          name="balance"
          label={mode === "add" ? "Initial Balance" : "Current Balance"}
          placeholder="0.00"
          type="number"
          disabled={mode === "edit"}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "edit" ? "Update Account" : "Create Account"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
