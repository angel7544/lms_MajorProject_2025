"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Fileupload from "@/components/Fileupload";
import axios from "axios";
import { toast } from "sonner";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfilePictureManagerProps {
  userId: string;
  profilePic: string | null;
  name: string;
}

const ProfilePictureManager = ({ userId, profilePic, name }: ProfilePictureManagerProps) => {
  const [newProfilePic, setNewProfilePic] = useState(profilePic || "");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const response = await axios.put("/api/student/update/settings", {
        name,
        bio: "", // We're only updating the profile picture, so we don't need to change the bio
        profilePic: newProfilePic,
      });
      
      if (response.status === 200) {
        toast.success("Profile picture updated successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture");
    } finally {
      setSaving(false);
    }
  };

  const isChanged = profilePic !== newProfilePic;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="mr-2 flex-shrink-0" /> Profile Picture
          </div>
          <Button 
            size="sm" 
            onClick={handleSubmit} 
            disabled={!isChanged || saving}
          >
            {saving ? "Saving..." : "Update Picture"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300">
            <Image 
              src={newProfilePic || "/icon-author.png"} 
              alt={name} 
              fill
              className="object-cover"
            />
            {newProfilePic && (
              <Button 
                variant="destructive" 
                size="sm"
                className="absolute bottom-0 right-0 h-8 w-8 p-0 rounded-full"
                onClick={() => setNewProfilePic("")}
              >
                X
              </Button>
            )}
          </div>
          <div className="w-full max-w-xs">
            <Fileupload
              endpoint="uploadBasicStuff"
              onChange={(url) => {
                setNewProfilePic(url);
              }}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Upload a square image for best results
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePictureManager; 