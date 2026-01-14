"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminLogin } from "@/api/admin/api.auth";
import { SignInInput, signInSchema } from "@/components/schema/auth.schema";
import SubmitButton from "@/components/forms/SubmitButton";
import TextField from "@/components/forms/TextField";

const Login = () => {
  const router = useRouter();
  const { mutate: login, isPending: isLoading } = useAdminLogin();

  const { control, handleSubmit } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInInput) => {
    login(data, {
      onSuccess: () => {
        router.push("/admin/");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">ERP Admin Panel</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="Phone Number"
              name="phoneNumber"
              control={control}
              placeholder="Enter your phone number"
              type="phoneNumber"
            />
            <TextField
              label="Password"
              name="password"
              control={control}
              placeholder="Enter your password"
              secureTextEntry
            />
            <div className="pt-2">
              <SubmitButton title="Sign In" loading={isLoading} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
