/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LockKeyholeOpen, Eye, EyeOff } from "lucide-react";
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
import { resetSchema } from "./ResetValidation";

const ChangePasswordModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(resetSchema),
    });

    const password = form.watch("Npassword");
    const passwordConfirm = form.watch("Cpassword");

    const {
        formState: { isSubmitting },
    } = form;

    // Show/hide state
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setOpen(false);
            form.reset();
            router.push('/login');
        } finally {
            setIsLoading(false);
        }
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
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant="secondary"
                        className="bg-[#F4FAFD] text-[#2489B0] flex items-center gap-2"
                        disabled={isLoading}
                    >
                        <LockKeyholeOpen className="size-5" />
                        Change password
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <div className="flex justify-evenly p-2 items-center rounded-2xl">
                        <div className="flex-1 flex flex-col gap-5 justify-center items-center rounded-2xl">
                            <Image src="/assets/Lock.png" alt="Forget Password" width={102} height={102} />
                            <div className="bg-[#F4FAFD] rounded-xl flex-grow justify-center items-center mx-auto px-10 py-10 w-full">
                                <DialogTitle>
                                    <div className="flex flex-col items-center justify-center mb-6">
                                        <h1 className="text-xl font-semibold">Unlock your account!</h1>
                                        <p className="w-11/12 text-center font-extralight text-base">
                                            Set a strong new password to unlock your account
                                        </p>
                                    </div>
                                </DialogTitle>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                            control={form.control}
                                            name="Opassword"
                                            render={({ field }) =>
                                                renderPasswordInput(field, "Old Password", showOld, () => setShowOld(prev => !prev))
                                            }
                                        />
                                        <FormField
                                            control={form.control}
                                            name="Npassword"
                                            render={({ field }) =>
                                                renderPasswordInput(field, "New Password", showNew, () => setShowNew(prev => !prev))
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
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChangePasswordModal;
