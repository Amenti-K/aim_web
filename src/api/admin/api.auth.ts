import { useMutate } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { login } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { IResponse } from "@/components/interface/common.interface";
import { IRegisterAdmin } from "@/components/interface/admin/admin.interface";

export const useAdminLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Login failed",
      variant: "destructive",
    });
  };
  const onSuccess = (data: any) => {
    dispatch(login(data));
    queryClient.invalidateQueries({ queryKey: ["admin"] });
    toast({
      title: "Success",
      description: "Logged in successfully",
    });
  };

  return useMutate(endpoints.ADMIN + "/login", "post", {
    onSuccess,
    onError,
  });
};

export const useRegisterAdmin = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Failed to register admin",
      variant: "destructive",
    });
  };
  const onSuccess = (data: any) => {
    toast({
      title: "Success",
      description: "Admin registered successfully",
    });
  };
  return useMutate(endpoints.ADMIN + "/register", "post", {
    onSuccess,
    onError,
  });
};
