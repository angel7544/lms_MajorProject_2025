"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  title: string;
}

const CategoriesManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/student/update/categories");
      const { allCategories, userCategoryIds } = response.data;
      setCategories(allCategories);
      setSelectedCategoryIds(userCategoryIds);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategoryIds.includes(categoryId)) {
      setSelectedCategoryIds(selectedCategoryIds.filter(id => id !== categoryId));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const response = await axios.put("/api/student/update/categories", {
        categoryIds: selectedCategoryIds
      });
      
      if (response.status === 200) {
        toast.success("Categories updated successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating categories:", error);
      toast.error("Failed to update categories");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Folder className="mr-2 flex-shrink-0" /> Preferred Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Folder className="mr-2 flex-shrink-0" /> Preferred Categories
          </div>
          <Button 
            size="sm" 
            onClick={handleSubmit} 
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Categories"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <div className="text-center py-4">No categories available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-start space-x-2 p-3 border rounded-md">
                <Checkbox 
                  id={`category-${category.id}`}
                  checked={selectedCategoryIds.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label 
                  htmlFor={`category-${category.id}`}
                  className="cursor-pointer"
                >
                  {category.title}
                </Label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoriesManager; 