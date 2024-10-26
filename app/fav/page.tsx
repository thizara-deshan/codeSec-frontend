"use client";

import { Heart } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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
  const [fav, setFav] = useState<
    {
      id: number;
      idMeal: string;
      imageUrl: string;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchFav = async () => {
      const response = await fetch(`${API_BASE_URL}/api/recipes/favorites`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setFav(data);
      console.log(fav);
    };
    fetchFav();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50">
      <main className="container mx-auto p-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {/* <Button onClick={() => fetchFav()}>Get Faviorite</Button> */}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {fav?.map((fav) => (
            <Card key={fav.id} className="overflow-hidden">
              <Image
                loader={() => fav.imageUrl}
                src={fav.imageUrl}
                alt={fav.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 flex items-center">
                  {fav.title}
                  <Heart className="h-4 w-4 ml-1 text-pink-500" />
                </p>
                <h3 className="font-semibold mt-1">{fav.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
