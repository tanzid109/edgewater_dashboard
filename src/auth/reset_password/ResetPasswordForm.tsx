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
    });
    const password = form.watch("password");
    const passwordConfirm = form.watch("Cpassword");

    const { formState: { isSubmitting } } = form;

    // Show/hide state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        router.push('/login');
    };

    const renderPasswordInput = (
        field: any,
        label: string,
        show: boolean,
        toggleShow: () => void,
        errorMessage?: string
    ) => (
        <FormItem>
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
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleShow}
                    className="absolute rounded-full right-2 top-1/2 -translate-y-1/2 p-1"
                >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
            </div>
            {errorMessage ? <FormMessage>{errorMessage}</FormMessage> : <FormMessage />}
        </FormItem>
    );

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-2/3 w-2/3 flex justify-evenly p-2 items-center bg-[#F4FAFD] rounded-2xl">
                {/* Logo Image */}
                <div className="flex flex-1 justify-center items-center bg-white h-full w-1/2 rounded-2xl mr-2">
                    <Image src="/assets/logo.png" alt="Edgewater Logo" width={315} height={216} />
                </div>
                {/* Reset Password Form */}
                <div className="bg-[#2489B0] flex-1 p-18 flex flex-col gap-5 justify-center items-center h-full rounded-2xl">
                    <div>
                        <Image src="/assets/Lock.png" alt="Forget Password" width={102} height={102} />
                    </div>
                    <div className="border-2 bg-white rounded-xl flex-grow justify-center items-center mx-auto px-10 py-10">
                        <div className="flex flex-col items-center justify-center mb-6">
                            <h1 className="text-xl font-semibold">Verify email</h1>
                            <p className="w-2/3 text-center font-extralight text-base">
                                Enter your email to get started. We’ll send you a verification code.
                            </p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) =>
                                        renderPasswordInput(field, "Password", showPassword, () => setShowPassword(prev => !prev))
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
                                            () => setShowConfirm(prev => !prev),
                                            passwordConfirm && password !== passwordConfirm ? "Password does not match" : undefined
                                        )
                                    }
                                />
                                <Button
                                    disabled={Boolean(passwordConfirm && password !== passwordConfirm)}
                                    type="submit"
                                    className="mt-5 w-full"
                                >
                                    {isSubmitting ? "Updating...." : "Update password"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
