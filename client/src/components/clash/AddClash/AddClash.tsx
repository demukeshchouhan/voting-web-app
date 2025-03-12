"use client";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { ClashData } from "@/lib/type";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

function AddClash({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<ClashData>({});
  const [clashData, setClashData] = useState<ClashData>({
    title: "",
    description: "",
    expireAt: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (file) setImage(file);
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setClashData({
      ...clashData,
      [evt.target.name]: evt.target.value,
    });

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", clashData?.title ?? "");
      formData.append("description", clashData?.description ?? "");
      formData.append("expire_at", clashData?.expireAt ?? "");
      if (image) formData.append("image", image);

      const { data } = await axios.post(CLASH_URL, formData, {
        headers: {
          Authorization: user.token,
        },
      });
      setLoading(false);
      if (data?.message) {
        setClashData({});
        toast.success(data?.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error?.response?.status === 422) {
          setErrors(error.response?.data?.errors);
        }
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-primary text-secondary p-2 border-r-card">
          Add Clash
        </DialogTrigger>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Create Clash</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <Label htmlFor="title">Enter Your Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Title"
                name="title"
                className="mt-1"
                value={clashData.title ?? ""}
                onChange={handleChange}
              />
              <span className="text-destructive">{errors?.title}</span>
            </div>
            <div className="mb-2">
              <Label htmlFor="description">Enter Your Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                name="description"
                className="mt-1"
                value={clashData.description ?? ""}
                onChange={handleChange}
              />
              <span className="text-destructive">{errors?.description}</span>
            </div>
            <div className="mb-2">
              <Label htmlFor="image">Clash Image</Label>
              <Input
                type="file"
                id="image"
                placeholder="import Clash Image"
                name="image"
                className="mt-1"
                onChange={handleImageChange}
              />
              <span className="text-destructive">{errors?.image}</span>
            </div>
            <div className="mb-2">
              <Label htmlFor="expireAt">Expire At</Label>
              <Input
                type="date"
                id="expireAt"
                placeholder="Expire At"
                name="expireAt"
                className="mt-1"
                value={clashData.expireAt ?? ""}
                onChange={handleChange}
              />
              <span className="text-destructive">{errors?.expireAt}</span>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="mt-4 flex justify-self-end"
            >
              {loading ? "Processing..." : "Create Clash"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddClash;
