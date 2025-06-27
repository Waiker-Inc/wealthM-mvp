import Sorting from "./RightPanel/components/Sorting";
import MyFavoriteStockNews from "./RightPanel/components/MyFavoriteStockNews";
import EconomicIndicatorCard from "./RightPanel/components/EconomicIndicatorCard";

export default function RightPanel() {
  return (
    <section className="bg-ground2 h-[100vh] py-10 px-6 flex flex-col gap-[60px]">
      <EconomicIndicatorCard />
      <MyFavoriteStockNews />
      <Sorting />
    </section>
  );
}
