import React from "react";

import CarouselItemsbar from "@/app/components/base/CarouselItemsbar";
import CarouselItembar from "@/app/components/base/CarouselItembar";
export default function Carouselsbar() {
  return (
    <div className="overflow-hidden">
      <CarouselItemsbar />
      <CarouselItembar />
    </div>
  );
}
