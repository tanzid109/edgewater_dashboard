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
import { forgetSchema } from "./ForgetValidation";

export default function ForgetPasswordForm() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(forgetSchema),
        defaultValues: {
            email: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log(data);
            // simulate API request
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push("/otp");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-2/3 h-2/3 p-2 bg-[#F4FAFD] rounded-2xl overflow-hidden shadow-md">
                {/* Left Section - Logo */}
                <div className="flex flex-1 justify-center items-center bg-white p-6 rounded-2xl">
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
                        src="/assets/Email.png"
                        alt="Forget Password"
                        width={100}
                        height={100}
                    />

                    <div className="bg-white text-black mt-6 rounded-xl w-full max-w-md p-8 shadow-md">
                        <div className="text-center mb-6">
                            <h1 className="text-xl font-semibold">Verify Email</h1>
                            <p className="text-sm text-gray-600 mt-2">
                                Enter your email to get started. We’ll send you a verification
                                code.
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-[#2489B0] hover:bg-[#1f7899]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Getting OTP..." : "Get OTP"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
