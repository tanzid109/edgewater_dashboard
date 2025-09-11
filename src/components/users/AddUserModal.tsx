"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { ImageUp, Plus } from "lucide-react";
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

const AddUserModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(userModalSchema),
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
                    <Button className="rounded-md py-[21px]">
                        <Plus className="size-5" />Add New User
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <Separator className="my-4" />
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div>
                                    <div className="flex flex-col gap-4 mb-4">
                                        <div className="h-[100px] w-[100px] rounded-full overflow-hidden mx-auto">
                                            <Image
                                                src={selectedImage || "/assets/user2.jpg"}
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
                                                className="flex items-center gap-2 "
                                                disabled={isLoading}
                                            >
                                                <ImageUp className="size-5" />
                                                Upload new photo
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
                                                            value={field.value || ""}
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
                                                            value={field.value || ""}
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
                                                            value={field.value || ""}
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
                                                            value={field.value || ""}
                                                            disabled={isLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-5">
                                    <DialogClose asChild>
                                        <Button
                                            className="bg-[#FFEFEF] text-[#D00004] rounded-md"
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
                                        {isLoading ? "Adding..." : "Add Now"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddUserModal;