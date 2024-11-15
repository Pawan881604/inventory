"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { X, CheckCircle, XCircle } from "lucide-react";

export default function Seo_form() {
  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
    canonicalUrl: "",
  });
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [isUrlValid, setIsUrlValid] = useState<boolean | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSeoData((prev) => ({ ...prev, [name]: value }));

    if (name === "canonicalUrl") {
      
      validateUrl(value);
    }
  };

  const validateUrl = (url: string) => {
    if (url.trim() === "") {
      setIsUrlValid(null);
      return;
    }

    try {
      const sanitizedUrl = url.replace(/[^a-zA-Z0-9-/_]/g, '');

      setSeoData((prev) => ({ ...prev, canonicalUrl: sanitizedUrl }));
      setIsUrlValid(true);
    } catch {
      setIsUrlValid(false);
    }
  };

  const handleKeywordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };

  const addKeywords = useCallback((newKeywords: string[]) => {
    setKeywords((prev) => {
      const uniqueNewKeywords = newKeywords.filter(
        (keyword) => keyword.trim() !== "" && !prev.includes(keyword.trim())
      );
      return [...prev, ...uniqueNewKeywords];
    });
  }, []);

  const handleKeywordInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeywords = keywordInput.split(",").map((k) => k.trim());
      addKeywords(newKeywords);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SEO Data:", { ...seoData, keywords });
    // Here you would typically send this data to your backend or update your page's metadata
  };

  const getCharacterCountColor = (current: number, recommended: number) => {
    if (current === 0) return "text-gray-500";
    if (current <= recommended) return "text-green-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>SEO Fields</CardTitle>
        <CardDescription>Enter your page's SEO information</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter page title"
              value={seoData.title}
              onChange={handleInputChange}
              maxLength={60}
            />
            <div className="flex justify-between text-sm">
              <span>Recommended: 50-60 characters</span>
              <span
                className={getCharacterCountColor(seoData.title.length, 60)}
              >
                {seoData.title.length}/60
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter page description"
              value={seoData.description}
              onChange={handleInputChange}
              maxLength={160}
            />
            <div className="flex justify-between text-sm">
              <span>Recommended: 150-160 characters</span>
              <span
                className={getCharacterCountColor(
                  seoData.description.length,
                  160
                )}
              >
                {seoData.description.length}/160
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              placeholder="Enter keywords (comma-separated or press Enter)"
              value={keywordInput}
              onChange={handleKeywordInputChange}
              onKeyDown={handleKeywordInputKeyDown}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-2 focus:outline-none"
                    aria-label={`Remove ${keyword}`}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="canonicalUrl">Canonical URL</Label>
            <p>Remove symbols like /, @, #, !, $, %, ^, &, *, (, ), +, =, [, ], |, :, ;, ', &quot;, &lt;, &gt;, ,, ?, and ~.</p>

            <div className="relative">
              <Input
                id="canonicalUrl"
                name="canonicalUrl"
                placeholder="Enter canonical URL"
                value={seoData.canonicalUrl}
                onChange={handleInputChange}
              />
              {isUrlValid !== null && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {isUrlValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {isUrlValid === false && (
              <p className="text-sm text-red-500">Please enter a valid URL</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Save SEO Data
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
