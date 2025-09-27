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
    const router = useRouter()
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
            router.push('/otp')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center  ">
            <div className="h-2/3 w-2/3 flex justify-evenly p-2 items-center bg-[#F4FAFD] rounded-2xl">
                {/* Logo Image */}
                <div className="flex flex-1 justify-center items-center bg-white h-full w-1/2 rounded-2xl mr-2">
                    <Image src="/assets/logo.png" alt="Edgewater Logo" width={315} height={216} />
                </div>
                {/* Login Form */}
                <div className="bg-[#2489B0] flex-1 p-18 flex flex-col gap-5 justify-center items-center h-full rounded-2xl">
                    <div>
                        <Image src="/assets/Email.png" alt="Forget Password" width={102} height={102}/>
                    </div>
                    <div className="border-2 bg-white rounded-xl flex-grow justify-center items-center mx-auto px-10 py-10">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-xl font-semibold">Verify email</h1>
                            <p className="w-2/3 text-center font-extralight text-base">Enter your email to get started. We’ll send you a verification code.</p>
                        </div>
                        <div className="">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="mt-5 w-full"
                                    >
                                        {isSubmitting ? "Getting OTP...." : "Get OTP"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


