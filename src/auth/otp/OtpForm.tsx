"use client";

import { Button } from "@/components/ui/button";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { otpSchema } from "./OtpValidation";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpForm() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
        mode: "onChange",
    });

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log(data);
            // simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push("/reset-password");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex w-full max-w-2/3 h-2/3 bg-[#F4FAFD] rounded-2xl overflow-hidden shadow-md p-2">
                {/* Left Section - Logo */}
                <div className="flex flex-1 justify-center items-center bg-white p-6 rounded-2xl ">
                    <Image
                        src="/assets/logo.png"
                        alt="Edgewater Logo"
                        width={300}
                        height={200}
                        className="object-contain"
                    />
                </div>

                {/* Right Section - OTP Form */}
                <div className="flex flex-1 flex-col justify-center items-center bg-[#2489B0] p-10 text-white rounded-2xl ml-2">
                    <Image
                        src="/assets/Email.png"
                        alt="OTP Verification"
                        width={100}
                        height={100}
                    />

                    <div className="bg-white text-black mt-6 rounded-xl w-full max-w-md p-8 shadow-md">
                        <div className="text-center mb-6">
                            <h1 className="text-xl font-semibold">OTP Verification</h1>
                            <p className="text-sm text-gray-600 mt-2">
                                We’ve sent a code to your email. Enter it below to continue.
                            </p>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6 flex flex-col items-center"
                            >
                                <Controller
                                    name="otp"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center">
                                            <InputOTP
                                                maxLength={6}
                                                value={field.value || ""}
                                                onChange={(val) => {
                                                    if (/^\d*$/.test(val)) field.onChange(val);
                                                }}
                                                className="gap-2"
                                            >
                                                <InputOTPGroup className="flex gap-2">
                                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                            className="w-12 h-12 text-lg font-semibold border-2 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#2489B0] text-center"
                                                        />
                                                    ))}
                                                </InputOTPGroup>
                                            </InputOTP>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-[#2489B0] hover:bg-[#1f7899]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Verifying..." : "Verify OTP"}
                                </Button>
                            </form>
                        </Form>
                        <div className="flex items-center justify-center text-center mt-4">
                            <p className="text-sm font-medium">Didn&apos;t get otp ?</p>
                            <span className="ml-2 text-base text-[#2489B0] font-medium">Resend</span>
                        </div>
                    </div>                   
                </div>
            </div>           
        </div>
    );
}
