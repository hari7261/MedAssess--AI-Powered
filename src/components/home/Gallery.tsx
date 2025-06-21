import { useState } from "react";
import { Card } from "@/components/ui/card";

const images = [
  "photo-1649972904349-6e44c42644a7",
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d",
  "photo-1581091226825-a6a2a5aee158",
  "photo-1485827404703-89b55fcc595e",
  "photo-1526374965328-7f61d4dc18c5",
  "photo-1531297484001-80022131f5a1",
  "photo-1487058792275-0ad4aaf24ca7",
  "photo-1605810230434-7631ac76ec81",
  "photo-1473091534298-04dcbce3278c",
  "photo-1519389950473-47ba0277781c",
  "photo-1460925895917-afdab827c52f",
  "photo-1581090464777-f3220bbe1b8b",
  "photo-1434494878577-86c23bcb06b9",
  "photo-1581092795360-fd1ca04f0952",
  "photo-1483058712412-4245e9b90334",
  "photo-1487887235947-a955ef187fcc",
  "photo-1472396961693-142e6e269027"
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (imageId) => {
    setSelectedImage(imageId);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="py-16 bg-gradient-to-r from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Our Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((imageId, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-lg"
              onClick={() => openImage(imageId)}
            >
              <img
                src={`https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=500&q=60`}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </Card>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-4xl mx-auto">
              <img
                src={`https://images.unsplash.com/${selectedImage}?auto=format&fit=crop&w=1000&q=80`}
                alt="Selected Gallery Image"
                className="w-full h-auto"
              />
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
