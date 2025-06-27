import Sorting from "./RightPanel/components/Sorting";
import MyFavoriteStockNews from "./RightPanel/components/MyFavoriteStockNews";

export default function RightPanel() {
  return (
    <section className="bg-ground2 h-[100vh] py-10 px-6">
      <MyFavoriteStockNews />
      <Sorting />
    </section>
  );
}
