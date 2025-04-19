import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: Response) {
  try {
    const { goalIds } = await req.json();
    
    if (!goalIds || !Array.isArray(goalIds)) {
      return NextResponse.json(
        { message: "Goal IDs are required and must be an array" },
        { status: 400 }
      );
    }
    
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { authId: userId },
      include: { goals: true }
    });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    // Delete existing user-goal associations
    await prisma.userGoal.deleteMany({
      where: { userId: user.id }
    });
    
    // Create new user-goal associations
    const userGoals = await Promise.all(
      goalIds.map(async (goalId) => {
        return prisma.userGoal.create({
          data: {
            userId: user.id,
            goalId: goalId
          }
        });
      })
    );
    
    return NextResponse.json({ message: "Goals updated successfully", userGoals }, { status: 200 });
  } catch (error) {
    console.error("Error updating goals:", error);
    return NextResponse.json({ message: "Failed to update goals" }, { status: 500 });
  }
}

// Get list of available goals
export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { authId: userId },
      include: {
        goals: {
          include: {
            goal: true
          }
        }
      }
    });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    // Get all available goals
    const allGoals = await prisma.goal.findMany({
      orderBy: {
        title: 'asc'
      }
    });
    
    // Create a list of user's selected goal IDs
    const userGoalIds = user.goals.map(userGoal => userGoal.goalId);
    
    return NextResponse.json({ 
      allGoals, 
      userGoalIds 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json({ message: "Failed to fetch goals" }, { status: 500 });
  }
} 