"use client";
import { Button } from "../ui/button";
import { ImageUp, Save, Trash2 } from "lucide-react";
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
// import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { userModalSchema } from "./UserModalValidation";
import { useState, useRef } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfileCard = () => {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        // resolver: zodResolver(userModalSchema),
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
    const handleDeleteImage = () => {
        setSelectedImage(null);
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
            router.push('/login');
        } catch (error) {
            // Handle error - keep modal open
            console.error("Error creating user:", error);
            // You might want to show an error toast here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-5 w-2xl bg-white rounded-2xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-4 p-4 border rounded-2xl">
                            <div className="h-[100px] w-[100px] rounded-full overflow-hidden mx-auto">
                                <Image
                                    src={selectedImage || "/assets/user2.jpg"}
                                    alt="Profile Image"
                                    height={100}
                                    width={100}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-2">                                
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                {/* change photo */}
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleUploadClick}
                                    className="bg-[#F8F8F8] text-[#333333] flex items-center gap-2 "
                                    disabled={isLoading}
                                >
                                    <ImageUp className="size-5" />
                                    Change Photo
                                </Button>
                                {/* Delete photo */}
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleDeleteImage}
                                    className="bg-[#FFEFEF] text-[#D00004] flex items-center gap-2 "
                                    disabled={isLoading}
                                >
                                    <Trash2 className="size-5" />
                                    Delete photo
                                </Button>
                                {/* Change password */}
                                <ChangePasswordModal/>
                            </div>
                        </div>
                        <div className="w-full ml-2">
                            <div className="bg-[#F8F8F8] flex flex-col gap-5 rounded-2xl w-full h-auto p-5">
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
                            </div>
                            <div className="flex  justify-end gap-2 mt-5 ">      
                                <Button
                                    type="submit"
                                    className="rounded-md"
                                    disabled={isLoading}
                                >
                                   <Save/> {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>                       
                    </div>              
                </form>
            </Form>
        </div>
    );
};

export default ProfileCard;