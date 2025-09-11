"use client";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { LockKeyholeOpen } from "lucide-react";
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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(resetSchema),
    });
    const password = form.watch("Npassword");
    const passwordConfirm = form.watch("Cpassword");
    const {
        formState: { isSubmitting },
    } = form;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        console.log("Selected image:", selectedImage);

        setIsLoading(true);

        try {
            // Simulate API call - replace with your actual API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Your actual API call would go here:
            // await createUser({ ...data, image: selectedImage });

            // Success - close modal, reset form, and navigate
            setOpen(false);
            form.reset();
            setSelectedImage(null);
            router.push('/admin/users');
        } catch (error) {
            // Handle error - keep modal open
            console.error("Error creating user:", error);
            // You might want to show an error toast here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant="secondary"
                        className="bg-[#F4FAFD] text-[#2489B0] flex items-center gap-2 "
                        disabled={isLoading}
                    >
                        <LockKeyholeOpen className="size-5" />
                        Change password
                    </Button>
                </DialogTrigger>
                <DialogTitle>
                    <DialogContent>
                        <div className=" flex justify-evenly p-2 items-center  rounded-2xl">
                            {/* Login Form */}
                            <div className=" flex-1 flex flex-col gap-5 justify-center items-center rounded-2xl">
                                <div>
                                    <Image src="/assets/Lock.png" alt="Forget Password" width={102} height={102} />
                                </div>
                                <div className=" bg-[#F4FAFD] rounded-xl flex-grow justify-center items-center mx-auto px-10 py-10">
                                    <div className="flex flex-col items-center justify-center">
                                        <h1 className="text-xl font-semibold">Unlock your account!</h1>
                                        <p className="w-11/12 text-center font-extralight text-base">Set a strong new password to unlock your account</p>
                                    </div>
                                    <div className="">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                                <FormField
                                                    control={form.control}
                                                    name="Opassword"
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
                                                <FormField
                                                    control={form.control}
                                                    name="Npassword"
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
                                                <FormField
                                                    control={form.control}
                                                    name="Cpassword"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Confirm Password</FormLabel>
                                                            <FormControl>
                                                                <Input type="password" {...field} value={field.value || ""} />
                                                            </FormControl>

                                                            {passwordConfirm && password !== passwordConfirm ? (
                                                                <FormMessage> Password does not match </FormMessage>
                                                            ) : (
                                                                <FormMessage />
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    disabled={passwordConfirm && password !== passwordConfirm}
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
                    </DialogContent>
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default ChangePasswordModal;