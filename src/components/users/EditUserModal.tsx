"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ImageUp, UserRoundPen } from "lucide-react";
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
import { userModalSchema } from "./UserModalValidation";
import { Separator } from "../ui/separator";
import { useState, useRef } from "react";

// ✅ User type
type User = {
    id: string;
    photo?: string;
    userId: number;
    name?: string;
    email: string;
    date?: string;
    time?: string;
    status: "active" | "inactive";
};

// ✅ Props typing
interface EditUserModalProps {
    row: { original: User };
}

const EditUserModal = ({ row }: EditUserModalProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(userModalSchema),
        defaultValues: {
            username: row.original.name || "",
            email: row.original.email || "",
            password: "",
            passwordconfirm: "",
        },
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Form Data:", data);
        console.log("Selected image:", selectedImage);

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Example API call:
            // await updateUser(row.original.id, { ...data, image: selectedImage });

            setOpen(false);
            form.reset();
            setSelectedImage(null);
            router.push("/admin/users");
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="bg-[#F8F8F8] h-12 w-12 rounded-full flex items-center justify-center text-[#333333] hover:bg-red-100 transition"
                    title="Edit"
                    onClick={() => setOpen(true)}
                >
                    <UserRoundPen className="w-6 h-6" />
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <Separator className="my-4" />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Profile Image */}
                        <div className="flex flex-col gap-4 mb-4">
                            <div className="h-[100px] w-[100px] rounded-full overflow-hidden mx-auto">
                                <Image
                                    src={selectedImage || row.original.photo || "/assets/user2.jpg"}
                                    alt="Profile Image"
                                    height={100}
                                    width={100}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleUploadClick}
                                    className="flex items-center gap-2"
                                    disabled={isLoading}
                                >
                                    <ImageUp className="size-5" />
                                    Change profile photo
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                placeholder="Type user name"
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                                placeholder="Type user email"
                                                disabled={isLoading}
                                            />
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
                                            <Input
                                                type="password"
                                                {...field}
                                                placeholder="Type user password"
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passwordconfirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Retype Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                                placeholder="Retype Password"
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 mt-5">
                            <DialogClose asChild>
                                <Button
                                    className="bg-[#FFEFEF] hover:text-white hover:bg-red-400 text-[#D00004] rounded-md"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="rounded-md"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Update Now"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserModal;
