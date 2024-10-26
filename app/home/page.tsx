"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const recipes = [
//   {
//     id: 1,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 2,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 3,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 4,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 5,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 6,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 7,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 8,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 9,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 10,
//     category: "Soups",
//     title: "Chicken Noodle Soup",
//     image: "/placeholder.svg",
//   },
// ];

export default function Component() {
  const [categories, setCategories] = useState<
    {
      idCategory: string;
      strCategory: string;
      strCategoryThumb: string;
      strCategoryDescription: string;
    }[]
  >([]);
  const [recipes, setRecipes] = useState<
    {
      idMeal: string;
      strMeal: string;
      strMealThumb: string;
    }[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      setCategories(data.categories);
      console.log(categories);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    const response = await fetch(
      `${API_BASE_URL}/api/recipes/category/${category}`
    );
    const data = await response.json();
    setRecipes(data); // Set recipes for the selected category
    console.log("Reciepe", data);
  };

  const addFavoriteRecipe = async (
    recipeId: string,
    strMealThumb: string,
    strMeal: string
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/api/recipes/favorite/${recipeId}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ strMealThumb, strMeal }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      toast.success("Added to Favorite");
    }
    if (!response.ok) {
      toast.success("already in favorite");
    }
    console.log(response);
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <main className="container mx-auto p-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              onClick={() => handleCategoryChange(category.strCategory)}
              key={category.idCategory}
              className={`${
                selectedCategory === category.strCategory
                  ? "bg-rose-500 text-white"
                  : "bg-gray-200 text-black"
              } px-4 py-2 rounded-md hover:bg-rose-500`}
            >
              {category.strCategory}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          {recipes.map((recipe) => (
            <Card
              onClick={() =>
                addFavoriteRecipe(
                  recipe.idMeal,
                  recipe.strMealThumb,
                  recipe.strMeal
                )
              }
              key={recipe.idMeal}
              className="overflow-hidden cursor-pointer hover:drop-shadow-lg"
            >
              <Image
                loader={() => recipe.strMealThumb}
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 flex items-center">
                  {recipe.strMeal}
                  <Heart className="h-4 w-4 ml-1 text-pink-500" />
                </p>
                <h3 className="font-semibold mt-1">{recipe.strMeal}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
