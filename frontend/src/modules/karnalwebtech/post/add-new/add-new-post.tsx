"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Link2Icon, FileTextIcon } from "lucide-react";
import { PostForm } from "@/components/post/index-form";
import CategorySelector from "@/components/post/post-categorie";
import { ScrollArea } from "@/components/ui/scroll-area";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import toast from "react-hot-toast";
import Image_card from "@/components/image_compress/Image_card";
import Seo_form from "@/components/common/seo/seo";
export default function AddNewPost() {
  const [postType, setPostType] = useState("post");
  const [itemData, setItemData] = useState<{ img: string; name: string }[]>([]);
  const borderStyle = "bg-transparent border-zinc-700";
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      toast.error("Image allowed only 1");
      return;
    }
    const imageData = acceptedFiles.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    // setFiles(acceptedFiles);
    setItemData(imageData);
  };
  const handleDelete = (index: number) => {
    // const newImages = files.filter((_: any, i: number) => i !== index);
    // const imageData = newImages.map((file: any) => ({
    //     img: URL.createObjectURL(file),
    //     name: file.name,
    // }));
    // // setFiles(newImages);
    // setItemData(imageData);
  };

  return (
    <div className="min-h-screen text-white p-4">
      <Card className="mx-auto bg-black border-zinc-800">
        <CardContent className="p-6">
          <div className="block lg:flex gap-4">
            {/* Left Panel: Post Creation */}
            <div className="w-full lg:w-[70%]">
              <h1 className="text-gray-200 text-2xl">Create a post</h1>
              <Tabs
                value={postType}
                onValueChange={setPostType}
                className="mb-6"
              >
                <TabsList className="bg-gray-700 my-2">
                  {[
                    { value: "post", label: "Post", icon: FileTextIcon },
                    { value: "image", label: "Image", icon: ImageIcon },
                    { value: "seo", label: "SEO", icon: Link2Icon },
                  ].map(({ value, label, icon: Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="data-[state=active]:bg-white hover:bg-gray-400 hover:text-black m-[2px]"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="post">
                  <PostForm />
                </TabsContent>

                <TabsContent value="image">
                  <Drag_input_field onDrop={handleDrop} color_class={"white"} />
                </TabsContent>

                <TabsContent value="seo">
                  <Seo_form/>
                </TabsContent>

                <ActionButtons />
              </Tabs>
            </div>

            {/* Right Panel: Sharing Options */}
            <div className="w-full lg:w-[30%]">
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <CategorySelector class_cat={"text-gray-200"} />
              </ScrollArea>
              {itemData ? (
                <div className="text-gray-200 my-2 bg-black w-full rounded-md border p-4">
                  <h3 className="text-xl">Feature Image</h3>
                  <div className="flex w-full flex-wrap my-2 gap-2">
                    {itemData.map((item, index) => (
                      <div key={index} className="w-[100%]">
                        <Image_card
                          item={item}
                          index={index}
                          onDelete={handleDelete}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <FooterActions />
        </CardContent>
      </Card>
    </div>
  );
}

function SectionHeader({ step, title }: { step: string; title: string }) {
  return (
    <div>
      <h2 className="text-orange-500 text-xs mb-1">Step {step}</h2>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
    </div>
  );
}

function FileUploader() {
  return (
    <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center">
      <p className="text-zinc-400 mb-2">Drag and drop image or</p>
      <Button variant="outline" className="bg-transparent border-zinc-700">
        Upload a file
      </Button>
    </div>
  );
}

function ActionButtons() {
  const labels = ["OC", "Spoiler", "NSFW", "Flair"];
  return (
    <div className="flex gap-2 mt-4">
      {labels.map((label) => (
        <Button
          key={label}
          variant="outline"
          size="sm"
          className="bg-transparent border-zinc-700"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

function PostingRules() {
  const rules = [
    "Remember the human",
    "Behave like you would in real life",
    "Look for the original source of content",
    "Search for duplicates before posting",
    "Read the community's rules",
  ];
  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardContent className="p-4">
        <h4 className="font-semibold mb-2">Posting Rules</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function FooterActions() {
  return (
    <div className="flex justify-between mt-6 pt-6 border-t border-zinc-800">
      <Button variant="ghost" className="text-zinc-400">
        Discard
      </Button>
      <div className="space-x-2">
        <Button variant="outline" className="bg-transparent border-zinc-700">
          Save draft
        </Button>
        <Button className="bg-orange-600 hover:bg-orange-700">Post</Button>
      </div>
    </div>
  );
}
