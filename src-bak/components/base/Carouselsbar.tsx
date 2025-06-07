import CarouselItembar from "@/components/base/CarouselItembar";
import CarouselItemsbar from "@/components/base/CarouselItemsbar";
export default function Carouselsbar() {
  return (
    <div className="overflow-hidden">
      <CarouselItemsbar />
      <CarouselItembar />
    </div>
  );
}
