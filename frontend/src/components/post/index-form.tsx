import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"; // Assuming this is a custom component
import { useForm, SubmitHandler, FieldValues, Controller } from "react-hook-form";
import { z } from "zod";
import { Jodit_text_editor } from "../common/fields/Jodit_text_editor";

// 1. Define the form schema
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    content: z.string().min(2, {
        message: "Content must be at least 2 characters.",
    }),
});

// Type the form hook using zod schema
export function PostForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            content: "",
        },
    });

    const borderStyle = "bg-transparent border-zinc-700";

    // 2. Define the submit handler
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
        console.log("Form Data: ", data);
        // Perform any action with the form data here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="dark-custom">
            <Controller
                control={control}
                name="username"
                render={({ field }) => (
                    <Input placeholder="Title" className={`text-gray-200 my-4 ${borderStyle}`} {...field} />
                )}
            />

            <Controller
                name="content"
                control={control}
                render={({ field }) => (
                    <Jodit_text_editor
                        value={field.value}
                        onChange={(value) => setValue("content", value)} // Update content field
                    />
                )}
            />

            <button type="submit" className="text-red">
                Submit
            </button>
        </form>
    );
}
