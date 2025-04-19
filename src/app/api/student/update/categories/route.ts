import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: Response) {
  try {
    const { categoryIds } = await req.json();
    
    if (!categoryIds || !Array.isArray(categoryIds)) {
      return NextResponse.json(
        { message: "Category IDs are required and must be an array" },
        { status: 400 }
      );
    }
    
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { authId: userId },
      include: { categories: true }
    });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    // Delete existing user-category associations
    await prisma.userCategory.deleteMany({
      where: { userId: user.id }
    });
    
    // Create new user-category associations
    const userCategories = await Promise.all(
      categoryIds.map(async (categoryId) => {
        return prisma.userCategory.create({
          data: {
            userId: user.id,
            categoryId: categoryId
          }
        });
      })
    );
    
    return NextResponse.json({ message: "Categories updated successfully", userCategories }, { status: 200 });
  } catch (error) {
    console.error("Error updating categories:", error);
    return NextResponse.json({ message: "Failed to update categories" }, { status: 500 });
  }
}

// Get list of available categories
export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { authId: userId },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    // Get all available categories
    const allCategories = await prisma.category.findMany({
      orderBy: {
        title: 'asc'
      }
    });
    
    // Create a list of user's selected category IDs
    const userCategoryIds = user.categories.map(userCategory => userCategory.categoryId);
    
    return NextResponse.json({ 
      allCategories, 
      userCategoryIds 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
} 