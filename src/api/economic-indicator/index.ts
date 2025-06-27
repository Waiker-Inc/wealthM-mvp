import axios from "@/lib/axios";

interface ResGetEconomicIndicator {
  indicatorName: string;
  announcementDt: string;
}

export const getEconomicIndicator = async () => {
  const response = await axios.get<ResGetEconomicIndicator>(
    `v1/wealthm/economic-indicator/upcoming`
  );

  return response.data;
};
