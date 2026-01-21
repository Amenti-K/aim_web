"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterAdmin } from "@/api/admin/api.auth";
import { RegisterInput, registerSchema } from "@/components/schema/auth.schema";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import TextField from "@/components/forms/fields/TextField";
import { IRegisterAdmin } from "@/components/interface/admin/admin.interface";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SwitchField from "@/components/forms/fields/SwitchField";

const RegisterAdmin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: register, isPending: isLoading } = useRegisterAdmin();
  const [successData, setSuccessData] = useState<IRegisterAdmin | null>(null);

  const { control, handleSubmit, reset } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
      isSuper: false,
    },
  });

  const onSubmit = (data: IRegisterAdmin) => {
    register(data, {
      onSuccess: () => {
        setSuccessData(data);
        reset();
      },
    });
  };

  const handleCopyCredentials = () => {
    if (!successData) return;

    const credentials = `
Name: ${successData.name}
Phone: ${successData.phoneNumber}
Password: ${successData.password}
    `.trim();

    navigator.clipboard.writeText(credentials);
    toast({
      title: "Copied!",
      description: "Credentials copied to clipboard.",
    });
  };

  const handleReset = () => {
    setSuccessData(null);
  };

  if (successData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">
              Registration Successful!
            </CardTitle>
            <CardDescription>
              The admin account has been created.
              <br />
              Please copy these credentials immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-white p-4 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="grid gap-3 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                    Name
                  </span>
                  <span className="font-medium">{successData.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                    Phone
                  </span>
                  <span className="font-mono">{successData.phoneNumber}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                    Password
                  </span>
                  <span className="font-mono">{successData.password}</span>
                </div>
              </div>
            </div>
            <Button
              className="w-full gap-2"
              variant="outline"
              onClick={handleCopyCredentials}
            >
              <Copy className="h-4 w-4" />
              Copy Credentials
            </Button>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="w-full flex-1" onClick={handleReset}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Register Another
            </Button>
            <Button
              className="w-full flex-1"
              variant="secondary"
              onClick={() => router.push("/admin")}
            >
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">New Admin</CardTitle>
          <CardDescription>Register a new admin user</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="Full Name"
              name="name"
              control={control}
              placeholder="Enter full name"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              control={control}
              placeholder="Enter phone number"
              type="tel"
            />
            <TextField
              label="Password"
              name="password"
              control={control}
              placeholder="Enter password"
              secureTextEntry
            />
            <SwitchField
              name="isSuper"
              label="Super Admin"
              description="Grants full system access"
              control={control}
            />
            <div className="pt-2">
              <SubmitButton title="Register Admin" loading={isLoading} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterAdmin;
