/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { resetSchema } from "./ResetValidation";

export default function ResetPasswordForm() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            password: "",
            Cpassword: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    const password = form.watch("password");
    const passwordConfirm = form.watch("Cpassword");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log(data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const renderPasswordInput = (
        field: any,
        label: string,
        show: boolean,
        toggleShow: () => void,
        errorMessage?: string
    ) => (
        <FormItem className="mb-4">
            <FormLabel>{label}</FormLabel>
            <div className="relative">
                <FormControl>
                    <Input
                        type={show ? "text" : "password"}
                        {...field}
                        value={field.value || ""}
                        className="pr-10"
                    />
                </FormControl>
                <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            {errorMessage ? (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            ) : (
                <FormMessage />
            )}
        </FormItem>
    );

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-2/3 h-auto bg-[#F4FAFD] rounded-2xl overflow-hidden shadow-md p-2">
                {/* Left Section - Logo */}
                <div className="flex flex-1 justify-center items-center bg-white rounded-2xl">
                    <Image
                        src="/assets/logo.png"
                        alt="Edgewater Logo"
                        width={300}
                        height={200}
                        className="object-contain"
                    />
                </div>

                {/* Right Section - Form */}
                <div className="flex flex-1 flex-col justify-center items-center bg-[#2489B0] p-10 text-white rounded-2xl ml-2">
                    <Image
                        src="/assets/Lock.png"
                        alt="Reset Password"
                        width={100}
                        height={100}
                    />
                    <div className="bg-white text-black mt-6 rounded-xl w-full max-w-md p-8 mb-10 shadow-md">
                        <div className="text-center mb-6">
                            <h1 className="text-xl font-semibold">Reset Password</h1>
                            <p className="text-sm text-gray-600 mt-2">
                                Create a new password for your account.
                            </p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) =>
                                        renderPasswordInput(
                                            field,
                                            "New Password",
                                            showPassword,
                                            () => setShowPassword((prev) => !prev)
                                        )
                                    }
                                />
                                <FormField
                                    control={form.control}
                                    name="Cpassword"
                                    render={({ field }) =>
                                        renderPasswordInput(
                                            field,
                                            "Confirm Password",
                                            showConfirm,
                                            () => setShowConfirm((prev) => !prev),
                                            passwordConfirm && password !== passwordConfirm
                                                ? "Passwords do not match"
                                                : undefined
                                        )
                                    }
                                />
                                <Button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        Boolean(passwordConfirm && password !== passwordConfirm)
                                    }
                                    className="mt-5 w-full bg-[#2489B0] hover:bg-[#1f7899]"
                                >
                                    {isSubmitting ? "Updating..." : "Update Password"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
