/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { LockKeyholeOpen, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeSchema } from "./ChangeValidation";

const ChangePasswordModal = () => {

    const form = useForm({
        resolver: zodResolver(changeSchema),
        defaultValues: { Opassword: "", Npassword: "", Cpassword: "" },
        mode: "onChange",
    });
    const Npassword = form.watch("Npassword");
    const Cpassword= form.watch("Cpassword");

    const { formState: { isSubmitting } } = form;

    const [showOld, setShowOld] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log(data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            form.reset();
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full"
                >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
            </div>
            <FormMessage>{errorMessage}</FormMessage>
        </FormItem>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="secondary"
                    className="bg-[#F4FAFD] text-[#2489B0] flex items-center"
                >
                    <LockKeyholeOpen className="size-4.5" />
                    Change Password
                </Button>
            </DialogTrigger>

            <DialogContent>
                <div className="flex justify-evenly p-2 items-center rounded-2xl">
                    <div className="flex-1 flex flex-col gap-5 justify-center items-center rounded-2xl">
                        <Image src="/assets/Lock.png" alt="Forget Password" width={102} height={102} className="h-auto w-auto"/>
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
                                        render={({ field, fieldState }) =>
                                            renderPasswordInput(field, "Old Password", showOld, () => setShowOld((p) => !p), fieldState.error?.message)
                                        }
                                    />

                                    <FormField
                                        control={form.control}
                                        name="Npassword"
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
                                                Npassword && Cpassword !== Npassword? "Password does not match" : undefined
                                            )
                                        }
                                    />

                                    <Button type="submit" 
                                        disabled={Boolean(Npassword && Npassword !== Cpassword)} 
                                    className="mt-5 w-full">
                                        {isSubmitting ? "Updating..." : "Update password"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordModal;
