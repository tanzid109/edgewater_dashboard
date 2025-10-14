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

    const {
        formState: { isSubmitting },
    } = form;

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log(data);
            await new Promise((resolve) => setTimeout(resolve, 3000));
        } catch (error) {
            console.error(error);
        } finally {
            router.push("/admin/dashboard");
        }
    };

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

                {/* Login Form */}
                <div className="flex flex-1 flex-col justify-center items-center bg-[#2489B0] p-10 text-white rounded-2xl ml-2">
                    <div className="border bg-white rounded-xl w-full max-w-md p-10 shadow-md my-12">
                        <div className="flex flex-col items-center justify-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back!</h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Sign in to continue your account
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    {...field}
                                                    value={field.value || ""}
                                                    placeholder="Enter your email"
                                                    className="rounded-lg border-gray-300 focus:border-[#2489B0] focus:ring-[#2489B0]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Password</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        {...field}
                                                        value={field.value || ""}
                                                        placeholder="Enter your password"
                                                        className="rounded-lg border-gray-300 focus:border-[#2489B0] focus:ring-[#2489B0] pr-10"
                                                    />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-[#2489B0]"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Remember Me + Forgot */}
                                <div className="flex items-center justify-between text-sm mt-2">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="remember" />
                                        <Label htmlFor="remember" className="text-gray-700">
                                            Remember me
                                        </Label>
                                    </div>
                                    <Link href="/forget-password" className="text-[#2489B0] font-medium">
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="mt-5 w-full bg-[#2489B0] hover:bg-[#1f7898] text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
