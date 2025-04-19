"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Target } from "lucide-react";
import { useRouter } from "next/navigation";

interface Goal {
  id: string;
  title: string;
}

const GoalsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoalIds, setSelectedGoalIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/student/update/goals");
      const { allGoals, userGoalIds } = response.data;
      setGoals(allGoals);
      setSelectedGoalIds(userGoalIds);
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  const handleGoalToggle = (goalId: string) => {
    if (selectedGoalIds.includes(goalId)) {
      setSelectedGoalIds(selectedGoalIds.filter(id => id !== goalId));
    } else {
      setSelectedGoalIds([...selectedGoalIds, goalId]);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const response = await axios.put("/api/student/update/goals", {
        goalIds: selectedGoalIds
      });
      
      if (response.status === 200) {
        toast.success("Goals updated successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating goals:", error);
      toast.error("Failed to update goals");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 flex-shrink-0" /> Learning Goals
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
            <Target className="mr-2 flex-shrink-0" /> Learning Goals
          </div>
          <Button 
            size="sm" 
            onClick={handleSubmit} 
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Goals"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-4">No goals available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-start space-x-2 p-3 border rounded-md">
                <Checkbox 
                  id={`goal-${goal.id}`}
                  checked={selectedGoalIds.includes(goal.id)}
                  onCheckedChange={() => handleGoalToggle(goal.id)}
                />
                <Label 
                  htmlFor={`goal-${goal.id}`}
                  className="cursor-pointer"
                >
                  {goal.title}
                </Label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalsManager; 