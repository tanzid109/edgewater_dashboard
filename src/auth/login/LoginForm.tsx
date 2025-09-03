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
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./LoginValidation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        router.push('/dashboard')
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center  ">
            <div className="h-2/3 w-2/3 flex justify-evenly p-2 items-center bg-[#F4FAFD] rounded-2xl">

                {/* Logo Image */}
                <div className=" flex justify-center items-center bg-white h-full w-1/2 rounded-2xl mr-2">
                    <Image src="/assets/logo.png" alt="Edgewater Logo" width={315} height={216} />
                </div>
                {/* Login Form */}
                <div className="bg-[#2489B0] px-18 flex justify-center items-center h-full w-1/2 rounded-2xl">
                    <div className="border-2 bg-white rounded-xl flex-grow mx-auto p-10">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-xl font-semibold">Welcome Back!</h1>
                            <p className="font-extralight text-sm text-gray-600">Sign in to continue your account</p>
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
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Checkbox id="terms" />
                                            <Label htmlFor="terms">Remember me</Label>
                                        </div>
                                        <Link href="/forget-password" className="text-[#2489B0]">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="mt-5 w-full"
                                    >
                                        {isSubmitting ? "Logging...." : "Login"}
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


