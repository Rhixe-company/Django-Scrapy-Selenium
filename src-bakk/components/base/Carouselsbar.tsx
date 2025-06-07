import CarouselItembar from "./CarouselItembar";
import CarouselItemsbar from "./CarouselItemsbar";
export default function Carouselsbar() {
  return (
    <div className="overflow-hidden">
      <CarouselItemsbar />
      <CarouselItembar />
    </div>
  );
}
