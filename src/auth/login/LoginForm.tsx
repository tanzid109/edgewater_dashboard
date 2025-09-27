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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { formState: { isSubmitting } } = form;

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log(data);
            // simulate API request
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/admin/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-2/3 w-2/3 flex justify-evenly p-2 items-center bg-[#F4FAFD] rounded-2xl">

                {/* Logo Image */}
                <div className="flex justify-center items-center bg-white h-full w-1/2 rounded-2xl mr-2">
                    <Image src="/assets/logo.png" alt="Edgewater Logo" width={315} height={216} />
                </div>

                {/* Login Form */}
                <div className="bg-[#2489B0] px-18 flex justify-center items-center h-full w-1/2 rounded-2xl">
                    <div className="border-2 bg-white rounded-xl flex-grow mx-auto p-10">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-xl font-semibold">Welcome Back!</h1>
                            <p className="font-extralight text-sm text-gray-600">Sign in to continue your account</p>
                        </div>
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
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        {...field}
                                                        value={field.value || ""}
                                                        className="pr-10"
                                                    />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setShowPassword(prev => !prev)}
                                                    className="absolute rounded-full right-2 top-1/2 -translate-y-1/2 p-1"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </Button>
                                            </div>
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
                                <Button type="submit" className="mt-5 w-full">
                                    {isSubmitting ? "Logging...." : "Login"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
