"use client";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { otpSchema } from "./OtpValidation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

export default function OtpForm() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
        mode: "onChange",          // validate on typing
        reValidateMode: "onChange" // revalidate on editing
    });

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log(data);
            // simulate API request
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push("/reset-password");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-2/3 w-2/3 flex justify-evenly p-2 items-center bg-[#F4FAFD] rounded-2xl">
                {/* Logo Image */}
                <div className="flex flex-1 justify-center items-center bg-white h-full w-1/2 rounded-2xl mr-2">
                    <Image src="/assets/logo.png" alt="Edgewater Logo" width={315} height={216} />
                </div>

                {/* OTP Form */}
                <div className="bg-[#2489B0] flex-1 p-18 flex flex-col gap-5 justify-center items-center h-full rounded-2xl">
                    <div>
                        <Image src="/assets/Email.png" alt="Forget Password" width={102} height={102} />
                    </div>

                    <div className="border-2 bg-white rounded-xl flex-grow justify-center items-center mx-auto px-10 py-10">
                        <div className="flex flex-col items-center justify-center my-5">
                            <h1 className="text-xl font-semibold">OTP verification</h1>
                            <p className="w-2/3 text-center font-extralight text-base">
                                We’ve sent a code to your email. Enter it below to continue.
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <Controller
                                    name="otp"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <InputOTP
                                                value={field.value || ""}
                                                onChange={(val) => {
                                                    // Only allow digits
                                                    if (/^\d*$/.test(val)) {
                                                        field.onChange(val);
                                                    }
                                                }}
                                                maxLength={6}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Verifying..." : "Verify OTP"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
