import { LoadingIndicator } from "./LoadingIndicator";
import { useEffect, useRef } from "react";

interface ChatMessageProps {
  question: string;
  answer?: string;
  isWaiting?: boolean;
}

const temp = `<!-- Iframe 임베딩 -->
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://hub.waiker.ai/management/widget/earnings/waiker-performance-widget.cdn.css"
    />
  </head>
  <body>
    <!-- Waiker Performance Widget BEGIN -->
    <div class="waiker-performance-widget-container">
      <div class="waiker-performance-widget-container__widget"></div>
      <script type="application/json">
        {"ric": "AAPL.O", "height": "610px", "width": "980px", "language": "en", "currency": "USD"}
      </script>
    </div>
    <script src="https://hub.waiker.ai/management/widget/earnings/waiker-performance-widget.cdn.iife.js"></script>
    <!-- Waiker Performance Widget END -->
  </body>
</html>




<iframe
    id="5b967aa1-0282-41b0-836b-a68cc39ee88c" 
    src="https://qa-embed.waiker.ai/preview?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS2V5IjoiYmZjNjhjMTBiYzljNGQxODg3ZjA5OGY5MGJmNWFjOWUifQ.dFUBr-7fACm7Stvz1QH5ax7YbDtnT8Aeg-UuRwVdQQE&ric=TSLA.O"
    class="h-full w-full"
></iframe>  

<script>
  const iframeDiv = document.getElementById('5b967aa1-0282-41b0-836b-a68cc39ee88c');
  console.log("~~~~~~333333",iframeDiv);
    
  iframeDiv.onload = () => {
    console.log("onload");
    iframeDiv.contentWindow.postMessage(
      {
        type: 'update_config',
        data: {
            productKey: 'WAIKER-WIDGET-369',
            configData: {
                "theme": "system",
                "lang": "en",
                "currency": {"hide": false, "defaultCurrency": "USD", "exchangeCurrency": "USD"},
                "data": [{"sort": 1, "typeDetail": "ITEM_MODULE", "componentName": "PoliticianStockTransaction"}]
            }
        },
      },
      '*'
    );
  };
</script>
{
  "news_list": [
    {
      "newsId": 399348,
      "title": "Why Tesla's robotaxi launch was the easy part",
      "originPress": "Reuters",
      "publishedDt": "2025-06-24T06:00:00Z",
      "revisedDt": "2025-06-24T06:11:09Z",
      "tickerList": [
        {
          "ric": "TSLA.DE",
          "ticker": "TL0",
          "companyName": "Tesla Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.DE.png"
        },
        {
          "ric": "ABEA.DE",
          "ticker": "ABEA",
          "companyName": "Alphabet Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/ABEA.DE.png"
        },
        {
          "ric": "ABECG.DE",
          "ticker": "ABEC",
          "companyName": "Alphabet Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/ABECG.DE.png"
        },
        {
          "ric": "W",
          "ticker": "W",
          "companyName": "Wayfair",
          "exchangeCountry": "US",
          "exchange": "NYSE",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/W.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "GOOGL.O",
          "ticker": "GOOGL",
          "companyName": "Alphabet Class A",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/GOOGL.O.png"
        }
      ]
    },
    {
      "newsId": 385082,
      "title": "Nissan launches new Leaf in push to revive its electric mojo ",
      "originPress": "Reuters",
      "publishedDt": "2025-06-17T12:00:00Z",
      "revisedDt": "2025-06-17T12:03:20Z",
      "tickerList": [
        {
          "ric": "TSLA.DE",
          "ticker": "TL0",
          "companyName": "Tesla Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.DE.png"
        },
        {
          "ric": "7201.T",
          "ticker": "7201",
          "companyName": "Nissan Motor Co Ltd",
          "exchangeCountry": "JP",
          "exchange": "TYO",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "RENA.PA",
          "ticker": "RNO",
          "companyName": "Renault SA",
          "exchangeCountry": "FR",
          "exchange": "PAR",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        }
      ]
    },
    {
      "newsId": 367544,
      "title": "[No Title]",
      "originPress": "Reuters",
      "publishedDt": "2025-06-09T13:12:02Z",
      "revisedDt": "2025-06-09T13:13:11Z",
      "tickerList": [
        {
          "ric": "QCOM.O",
          "ticker": "QCOM",
          "companyName": "Qualcomm",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/QCOM.O.png"
        },
        {
          "ric": "HOOD.O",
          "ticker": "HOOD",
          "companyName": "Robinhood Markets",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/HOOD.O.png"
        },
        {
          "ric": "PLCE.O",
          "ticker": "PLCE",
          "companyName": "Children's Place",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/PLCE.O.png"
        },
        {
          "ric": "ISRG.O",
          "ticker": "ISRG",
          "companyName": "Intuitive Surgical",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/ISRG.O.png"
        },
        {
          "ric": "BKNG.O",
          "ticker": "BKNG",
          "companyName": "Booking Holdings",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/BKNG.O.png"
        },
        {
          "ric": "APP.O",
          "ticker": "APP",
          "companyName": "AppLovin",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/APP.O.png"
        },
        {
          "ric": "AXSM.O",
          "ticker": "AXSM",
          "companyName": "Axsome Therapeutics",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AXSM.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "PLUG.O",
          "ticker": "PLUG",
          "companyName": "Plug Power",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/PLUG.O.png"
        },
        {
          "ric": "MTSR.O",
          "ticker": "MTSR",
          "companyName": "Metsera Inc",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "AWE.L",
          "ticker": "AWE",
          "companyName": "Alphawave IP Group PLC",
          "exchangeCountry": "GB",
          "exchange": "LSE",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        }
      ]
    },
    {
      "newsId": 364571,
      "title": "MORNING BID AMERICAS-Trump-Musk bust-up smolders",
      "originPress": "Reuters",
      "publishedDt": "2025-06-06T11:11:45Z",
      "revisedDt": "2025-06-06T11:13:37Z",
      "tickerList": [
        {
          "ric": "TSLA.DE",
          "ticker": "TL0",
          "companyName": "Tesla Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.DE.png"
        },
        {
          "ric": "1YD.DE",
          "ticker": "1YD",
          "companyName": "Broadcom Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "BRKb",
          "ticker": "BRK.B",
          "companyName": "Berkshire Hathaway Class B",
          "exchangeCountry": "US",
          "exchange": "NYSE",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/BRKb.png"
        },
        {
          "ric": "BRKb.DE",
          "ticker": "BRYN",
          "companyName": "Berkshire Hathaway Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/BRKb.DE.png"
        },
        {
          "ric": "BAC",
          "ticker": "BAC",
          "companyName": "Bank of America",
          "exchangeCountry": "US",
          "exchange": "NYSE",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/BAC.png"
        },
        {
          "ric": "BAC.DE",
          "ticker": "NCB",
          "companyName": "Bank of America Corp",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "AVGO.O",
          "ticker": "AVGO",
          "companyName": "Broadcom",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AVGO.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        }
      ]
    },
    {
      "newsId": 363190,
      "title": "QUOTES -Trump, Musk public feud escalates; Nasdaq falls; Tesla, DJT tumble,",
      "originPress": "Reuters",
      "publishedDt": "2025-06-05T20:35:17Z",
      "revisedDt": "2025-06-05T20:37:46Z",
      "tickerList": [
        {
          "ric": "TSLA.DE",
          "ticker": "TL0",
          "companyName": "Tesla Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.DE.png"
        },
        {
          "ric": ".IXIC",
          "ticker": "IXIC",
          "companyName": "NASDAQ Composite Index",
          "exchangeCountry": "US",
          "exchange": "COM",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/.IXIC.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "DJT.O",
          "ticker": "DJT",
          "companyName": "Trump Media & Technology Group Corp",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "SIEB.O",
          "ticker": "SIEB",
          "companyName": "Siebert Financial",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/SIEB.O.png"
        }
      ]
    },
    {
      "newsId": 246868,
      "title": "UPDATE 1-Tesla not keen on local production in India, minister says",
      "originPress": "Reuters",
      "publishedDt": "2025-06-02T08:08:12Z",
      "revisedDt": "2025-06-02T08:09:56Z",
      "tickerList": [
        {
          "ric": "0R0X.L",
          "ticker": "0R0X",
          "companyName": "Tesla Inc",
          "exchangeCountry": "GB",
          "exchange": "LSE",
          "score": 0.9,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/0R0X.L.png"
        },
        {
          "ric": "TSLA.DE",
          "ticker": "TL0",
          "companyName": "Tesla Inc",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 0.9,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.DE.png"
        },
        {
          "ric": "VOWG_p.DE",
          "ticker": "VOW3",
          "companyName": "Volkswagen AG",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "TAMO.BO",
          "ticker": "500570",
          "companyName": "Tata Motors Ltd",
          "exchangeCountry": "IN",
          "exchange": "BSE",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "TAMOt0.BO",
          "ticker": "100570",
          "companyName": "[No Name]",
          "exchangeCountry": "IN",
          "exchange": "BSE",
          "score": 0.8,
          "companyImageUrl": ""
        },
        {
          "ric": "MAHM.BO",
          "ticker": "500520",
          "companyName": "Mahindra and Mahindra Ltd",
          "exchangeCountry": "IN",
          "exchange": "BSE",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "MAHMq.L",
          "ticker": "MHID",
          "companyName": "Mahindra and Mahindra Ltd",
          "exchangeCountry": "GB",
          "exchange": "LSE",
          "score": 0.8,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "MAHMt0.BO",
          "ticker": "100520",
          "companyName": "[No Name]",
          "exchangeCountry": "IN",
          "exchange": "BSE",
          "score": 0.8,
          "companyImageUrl": ""
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "MBGn.DE",
          "ticker": "MBG",
          "companyName": "Mercedes-Benz Group AG",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "VOWG.DE",
          "ticker": "VOW",
          "companyName": "Volkswagen AG",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "PSHG_p.DE",
          "ticker": "PAH3",
          "companyName": "Porsche Automobil Holding SE",
          "exchangeCountry": "DE",
          "exchange": "GER",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        }
      ]
    },
    {
      "newsId": 127350,
      "title": "BREAKINGVIEWS-How Apple's China celebration became a conundrum: podcast",
      "originPress": "Reuters",
      "publishedDt": "2025-05-20T04:47:39Z",
      "revisedDt": "2025-05-20T04:57:10Z",
      "tickerList": [
        {
          "ric": "2317.TW",
          "ticker": "2317",
          "companyName": "Hon Hai Precision Industry Co Ltd",
          "exchangeCountry": "TW",
          "exchange": "TAI",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "AAPL.O",
          "ticker": "AAPL",
          "companyName": "Apple",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AAPL.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        }
      ]
    },
    {
      "newsId": 127343,
      "title": "BREAKINGVIEWS-How Apple's China celebration became a conundrum: podcast",
      "originPress": "Reuters",
      "publishedDt": "2025-05-20T04:47:39Z",
      "revisedDt": "2025-05-20T04:49:28Z",
      "tickerList": [
        {
          "ric": "2317.TW",
          "ticker": "2317",
          "companyName": "Hon Hai Precision Industry Co Ltd",
          "exchangeCountry": "TW",
          "exchange": "TAI",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "AAPL.O",
          "ticker": "AAPL",
          "companyName": "Apple",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AAPL.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        }
      ]
    },
    {
      "newsId": 127160,
      "title": "UPDATE 1-Alphabet's Waymo gets California nod for robotaxi expansion in San Francisco Bay Area",
      "originPress": "Reuters",
      "publishedDt": "2025-05-20T00:46:38Z",
      "revisedDt": "2025-05-20T00:51:48Z",
      "tickerList": [
        {
          "ric": "GOOGL.O",
          "ticker": "GOOGL",
          "companyName": "Alphabet Class A",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/GOOGL.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        }
      ]
    },
    {
      "newsId": 126553,
      "title": "US STOCKS-Wall Street stocks edge lower with sentiment weakened by Moody's downgrade",
      "originPress": "Reuters",
      "publishedDt": "2025-05-19T18:51:22Z",
      "revisedDt": "2025-05-19T19:03:00Z",
      "tickerList": [
        {
          "ric": "AAPL.O",
          "ticker": "AAPL",
          "companyName": "Apple",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AAPL.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "GOOGL.O",
          "ticker": "GOOGL",
          "companyName": "Alphabet Class A",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/GOOGL.O.png"
        },
        {
          "ric": "NVAX.O",
          "ticker": "NVAX",
          "companyName": "Novavax ADR",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/NVAX.O.png"
        }
      ]
    },
    {
      "newsId": 126549,
      "title": "US STOCKS-Wall Street stocks edge lower with sentiment weakened by Moody's downgrade",
      "originPress": "Reuters",
      "publishedDt": "2025-05-19T18:51:22Z",
      "revisedDt": "2025-05-19T18:56:57Z",
      "tickerList": [
        {
          "ric": "AAPL.O",
          "ticker": "AAPL",
          "companyName": "Apple",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AAPL.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "GOOGL.O",
          "ticker": "GOOGL",
          "companyName": "Alphabet Class A",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/GOOGL.O.png"
        },
        {
          "ric": "NVAX.O",
          "ticker": "NVAX",
          "companyName": "Novavax ADR",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/NVAX.O.png"
        }
      ]
    },
    {
      "newsId": 126547,
      "title": "US STOCKS-Wall Street stocks edge lower with sentiment weakened by Moody's downgrade",
      "originPress": "Reuters",
      "publishedDt": "2025-05-19T18:51:22Z",
      "revisedDt": "2025-05-19T18:55:00Z",
      "tickerList": [
        {
          "ric": "AAPL.O",
          "ticker": "AAPL",
          "companyName": "Apple",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AAPL.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "GOOGL.O",
          "ticker": "GOOGL",
          "companyName": "Alphabet Class A",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/GOOGL.O.png"
        },
        {
          "ric": "NVAX.O",
          "ticker": "NVAX",
          "companyName": "Novavax ADR",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/NVAX.O.png"
        }
      ]
    },
    {
      "newsId": 126454,
      "title": "[No Title]",
      "originPress": "Reuters",
      "publishedDt": "2025-05-19T17:46:58Z",
      "revisedDt": "2025-05-19T17:47:07Z",
      "tickerList": [
        {
          "ric": "NVAX.O",
          "ticker": "NVAX",
          "companyName": "Novavax ADR",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/NVAX.O.png"
        },
        {
          "ric": "MAR.O",
          "ticker": "MAR",
          "companyName": "Marriott International",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/MAR.O.png"
        },
        {
          "ric": "AMZN.O",
          "ticker": "AMZN",
          "companyName": "Amazon",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AMZN.O.png"
        },
        {
          "ric": "PLUG.O",
          "ticker": "PLUG",
          "companyName": "Plug Power",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/PLUG.O.png"
        },
        {
          "ric": "RILY.O",
          "ticker": "RILY",
          "companyName": "B Riley Financial",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/RILY.O.png"
        },
        {
          "ric": "NFLX.O",
          "ticker": "NFLX",
          "companyName": "Netflix",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/NFLX.O.png"
        },
        {
          "ric": "MSFT.O",
          "ticker": "MSFT",
          "companyName": "Microsoft",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/MSFT.O.png"
        },
        {
          "ric": "TLN.O",
          "ticker": "TLN",
          "companyName": "Talen Energy Corp",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "NEXT.O",
          "ticker": "NEXT",
          "companyName": "NextDecade",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/NEXT.O.png"
        },
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        },
        {
          "ric": "AAfPL.O",
          "ticker": "AAPL",
          "companyName": "Apple",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/AAPL.O.png"
        },
        {
          "ric": "APA.O",
          "ticker": "APA",
          "companyName": "APA",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/APA.O.png"
        },
        {
          "ric": "RR.O",
          "ticker": "RR",
          "companyName": "Richtech Robotics",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/RR.O.png"
        },
        {
          "ric": "REGN.O",
          "ticker": "REGN",
          "companyName": "Regeneron Pharmaceuticals",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/REGN.O.png"
        },
        {
          "ric": "CRWV.O",
          "ticker": "CRWV",
          "companyName": "CoreWeave Inc",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/stock.png"
        },
        {
          "ric": "BGC.O",
          "ticker": "BGC",
          "companyName": "BGC Group",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/BGC.O.png"
        }
      ]
    },
    {
      "newsId": 126295,
      "title": "US STOCKS-Wall St falls after Moody's surprise downgrade; yields rise",
      "originPress": "Reuters",
      "publishedDt": "2025-05-19T16:18:43Z",
      "revisedDt": "2025-05-19T16:27:15Z",
      "tickerList": [
        {
          "ric": "TSLA.O",
          "ticker": "TSLA",
          "companyName": "Tesla",
          "exchangeCountry": "US",
          "exchange": "NASDAQ",
          "score": 1.0,
          "companyImageUrl": "https://hub.waiker.ai/logo/square/TSLA.O.png"
        }
      ]
    }
  ]
}
<!-- Iframe 임베딩 -->
<iframe
    id="bb715740-b256-4d2b-8087-b55dd9613305" 
    src="https://beta-embed.waiker.ai/preview?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS2V5IjoiYmZjNjhjMTBiYzljNGQxODg3ZjA5OGY5MGJmNWFjOWUifQ.dFUBr-7fACm7Stvz1QH5ax7YbDtnT8Aeg-UuRwVdQQE&ric=TSLA.O"
    class="h-full w-full"
></iframe>  

<script>
    const iframe = document.getElementById('bb715740-b256-4d2b-8087-b55dd9613305');
    
    iframe.onload = () => {
    iframe.contentWindow.postMessage(
        {
        type: 'update_config',
        data: {
            productKey: 'WAIKER-WIDGET-748',
            configData: {
                "theme": "system",
                "lang": "en",
                "currency": {"hide": false, "defaultCurrency": "USD", "exchangeCurrency": "USD"},
                "data": [{"sort": 1, "typeDetail": "ITEM_MODULE", "componentName": "ItemInsiderTransactions"}]
            }
        },
        },
        '*'
    );
    };
</script>


<iframe
    id="bb715740-b256-4d2b-8087-123124124" 
    src="https://qa-embed.waiker.ai/34?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS2V5IjoiYmZjNjhjMTBiYzljNGQxODg3ZjA5OGY5MGJmNWFjOWUifQ.dFUBr-7fACm7Stvz1QH5ax7YbDtnT8Aeg-UuRwVdQQE&ric=TSLA.O"
    class="h-full w-full"
></iframe>  


# Tesla, Inc. (TSLA)
**Sector**: Consumer Cyclical
**Industry**: Auto - Manufacturers
**CEO**: Elon R. Musk
**Description**: Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. It operates in two segments, Automotive, and Energy Generation and Storage. The Automotive segment offers electric vehicles, as well as sells automotive regulatory credits; and non-warranty after-sales vehicle, used vehicles, retail merchandise, and vehicle insurance services. This segment also provides sedans and sport utility vehicles through direct and used vehicle sales, a network of Tesla Superchargers, and in-app upgrades; purchase financing and leasing services; services for electric vehicles through its company-owned service locations and Tesla mobile service technicians; and vehicle limited warranties and extended service plans. The Energy Generation and Storage segment engages in the design, manufacture, installation, sale, and leasing of solar energy generation and energy storage products, and related services to residential, commercial, and industrial customers and utilities through its website, stores, and galleries, as well as through a network of channel partners; and provision of service and repairs to its energy product customers, including under warranty, as well as various financing options to its solar customers. The company was formerly known as Tesla Motors, Inc. and changed its name to Tesla, Inc. in February 2017. Tesla, Inc. was incorporated in 2003 and is headquartered in Austin, Texas.

## Financial Overview
**Market Cap**: $N/A
**Price**: $317.66
**Beta**: 2.461
**Volume Average**: N/A
**DCF**: $N/A

## Key Metrics
**P/E Ratio**: N/A
**EPS**: $N/A
**ROE**: N/A
**ROA**: N/A
**Revenue Per Share**: $N/A

## Additional Information
**Website**: https://www.tesla.com
**Exchange**: NASDAQ
**Founded**: 2010-06-29
<div class="tradingview-widget-container" style="width:100%">
    <div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%"></div>
    <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
  {"allow_symbol_change": true, "calendar": false, "details": false, "hide_side_toolbar": true, "hide_top_toolbar": false, "hide_legend": false, "hide_volume": true, "hotlist": false, "interval": "D", "locale": "en", "save_image": true, "style": "2", "symbol": "NASDAQ:TSLA", "theme": "dark", "timezone": "Etc/UTC", "backgroundColor": "#ffffff", "gridColor": "rgba(46, 46, 46, 0.06)", "watchlist": [], "withdateranges": false, "compareSymbols": [{"symbol": "AMEX:SPY", "position": "SameScale"}, {"symbol": "NASDAQ:QQQ", "position": "SameScale"}], "studies": [], "height": 600}
  </script>
</div>
<!-- TradingView Widget END -->
# Income Statement for TSLA

## Period: 2025-03-31
**Report Type**: Q1
**Currency**: USD
**Fiscal Year**: 2025
**Filing Date**: 2025-04-23
**Accepted Date**: 2025-04-22 21:02:10
**CIK**: 0001318605

### Revenue Metrics
**Revenue**: $19,335,000,000
**Cost of Revenue**: $16,182,000,000
**Gross Profit**: $3,153,000,000

### Expense Breakdown
**Research and Development**: $1,409,000,000
**Selling, General, and Administrative**: $1,251,000,000
**General and Administrative**: $0
**Selling and Marketing**: $0
**Other Expenses**: $94,000,000
**Operating Expenses**: $2,754,000,000
**Cost and Expenses**: $18,936,000,000
**Depreciation and Amortization**: $1,447,000,000

### Income and Profitability
**Net Interest Income**: $309,000,000
**Interest Income**: $400,000,000
**Interest Expense**: $91,000,000
**Non-Operating Income**: $-281,000,000
**Other Income/Expenses Net**: $190,000,000

### Operating Metrics
**Operating Income**: $399,000,000
**EBITDA**: $2,127,000,000
**EBIT**: $680,000,000

### Tax and Net Income
**Income Before Tax**: $589,000,000
**Income Tax Expense**: $169,000,000
**Net Income from Continuing Operations**: $420,000,000
**Net Income from Discontinued Operations**: $0
**Other Adjustments to Net Income**: $0
**Net Income Deductions**: $0
**Net Income**: $409,000,000
**Bottom Line Net Income**: $409,000,000

### Per Share Data
**EPS**: $0.13
**EPS Diluted**: $0.12
**Weighted Average Shares Outstanding**: 3,218,000,000
**Weighted Average Shares Outstanding (Diluted)**: 3,521,000,000

## Period: 2024-12-31
**Report Type**: Q4
**Currency**: USD
**Fiscal Year**: 2024
**Filing Date**: 2025-01-30
**Accepted Date**: 2025-01-29 20:42:33
**CIK**: 0001318605

### Revenue Metrics
**Revenue**: $25,707,000,000
**Cost of Revenue**: $21,528,000,000
**Gross Profit**: $4,179,000,000

### Expense Breakdown
**Research and Development**: $1,276,000,000
**Selling, General, and Administrative**: $1,313,000,000
**General and Administrative**: $0
**Selling and Marketing**: $0
**Other Expenses**: $7,000,000
**Operating Expenses**: $2,596,000,000
**Cost and Expenses**: $24,124,000,000
**Depreciation and Amortization**: $1,496,000,000

### Income and Profitability
**Net Interest Income**: $346,000,000
**Interest Income**: $442,000,000
**Interest Expense**: $96,000,000
**Non-Operating Income**: $-1,279,000,000
**Other Income/Expenses Net**: $1,183,000,000

### Operating Metrics
**Operating Income**: $1,583,000,000
**EBITDA**: $4,358,000,000
**EBIT**: $2,862,000,000

### Tax and Net Income
**Income Before Tax**: $2,766,000,000
**Income Tax Expense**: $434,000,000
**Net Income from Continuing Operations**: $2,332,000,000
**Net Income from Discontinued Operations**: $0
**Other Adjustments to Net Income**: $None
**Net Income Deductions**: $42,000,000
**Net Income**: $2,356,000,000
**Bottom Line Net Income**: $2,314,000,000

### Per Share Data
**EPS**: $0.72
**EPS Diluted**: $0.66
**Weighted Average Shares Outstanding**: 3,213,000,000
**Weighted Average Shares Outstanding (Diluted)**: 3,517,000,000

## Period: 2024-09-30
**Report Type**: Q3
**Currency**: USD
**Fiscal Year**: 2024
**Filing Date**: 2024-10-24
**Accepted Date**: 2024-10-23 20:42:47
**CIK**: 0001318605

### Revenue Metrics
**Revenue**: $25,182,000,000
**Cost of Revenue**: $20,185,000,000
**Gross Profit**: $4,997,000,000

### Expense Breakdown
**Research and Development**: $1,039,000,000
**Selling, General, and Administrative**: $1,186,000,000
**General and Administrative**: $0
**Selling and Marketing**: $0
**Other Expenses**: $55,000,000
**Operating Expenses**: $2,280,000,000
**Cost and Expenses**: $22,465,000,000
**Depreciation and Amortization**: $1,348,000,000

### Income and Profitability
**Net Interest Income**: $337,000,000
**Interest Income**: $429,000,000
**Interest Expense**: $92,000,000
**Non-Operating Income**: $-159,000,000
**Other Income/Expenses Net**: $67,000,000

### Operating Metrics
**Operating Income**: $2,717,000,000
**EBITDA**: $4,224,000,000
**EBIT**: $2,876,000,000

### Tax and Net Income
**Income Before Tax**: $2,784,000,000
**Income Tax Expense**: $601,000,000
**Net Income from Continuing Operations**: $2,183,000,000
**Net Income from Discontinued Operations**: $0
**Other Adjustments to Net Income**: $0
**Net Income Deductions**: $0
**Net Income**: $2,167,000,000
**Bottom Line Net Income**: $2,167,000,000

### Per Share Data
**EPS**: $0.68
**EPS Diluted**: $0.62
**Weighted Average Shares Outstanding**: 3,198,000,000
**Weighted Average Shares Outstanding (Diluted)**: 3,497,000,000

## Period: 2024-06-30
**Report Type**: Q2
**Currency**: USD
**Fiscal Year**: 2024
**Filing Date**: 2024-07-24
**Accepted Date**: 2024-07-23 19:41:09
**CIK**: 0001318605

### Revenue Metrics
**Revenue**: $25,500,000,000
**Cost of Revenue**: $20,922,000,000
**Gross Profit**: $4,578,000,000

### Expense Breakdown
**Research and Development**: $1,074,000,000
**Selling, General, and Administrative**: $1,277,000,000
**General and Administrative**: $0
**Selling and Marketing**: $0
**Other Expenses**: $622,000,000
**Operating Expenses**: $2,973,000,000
**Cost and Expenses**: $23,895,000,000
**Depreciation and Amortization**: $1,278,000,000

### Income and Profitability
**Net Interest Income**: $262,000,000
**Interest Income**: $348,000,000
**Interest Expense**: $86,000,000
**Non-Operating Income**: $-368,000,000
**Other Income/Expenses Net**: $282,000,000

### Operating Metrics
**Operating Income**: $1,605,000,000
**EBITDA**: $3,251,000,000
**EBIT**: $1,973,000,000

### Tax and Net Income
**Income Before Tax**: $1,887,000,000
**Income Tax Expense**: $393,000,000
**Net Income from Continuing Operations**: $1,494,000,000
**Net Income from Discontinued Operations**: $0
**Other Adjustments to Net Income**: $0
**Net Income Deductions**: $0
**Net Income**: $1,478,000,000
**Bottom Line Net Income**: $1,478,000,000

### Per Share Data
**EPS**: $0.46
**EPS Diluted**: $0.42
**Weighted Average Shares Outstanding**: 3,191,000,000
**Weighted Average Shares Outstanding (Diluted)**: 3,481,000,000
No company notes data found for symbol TSLA
No dividend data found for symbol TSLA
# Analyst Ratings for TSLA
*Data as of 2025-07-01 03:16:18*

## Rating Summary
**Rating**: B-
**Overall Score**: 2/5

## Component Scores
**Discounted Cash Flow Score**: 2/5
**Return on Equity Score**: 3/5
**Return on Assets Score**: 4/5
**Debt to Equity Score**: 3/5
**Price to Earnings Score**: 1/5
**Price to Book Score**: 1/5

## Rating System Explanation
The rating is based on a scale of A+ to F, where:
- A+ to A-: Strong Buy/Buy (Score 5-4)
- B+ to B-: Outperform (Score 4-3)
- C+ to C-: Hold/Neutral (Score 3-2)
- D+ to D-: Underperform (Score 2-1)
- F: Sell (Score < 1)

Each component score is rated from 1 (worst) to 5 (best).

<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://hub.waiker.ai/management/widget/earnings/waiker-performance-widget.cdn.css"
    />
  </head>
  <body>
    <!-- Waiker Performance Widget BEGIN -->
    <div class="waiker-performance-widget-container">
      <div class="waiker-performance-widget-container__widget"></div>
      <script type="application/json">
        {"ric": "TSLA.O", "height": "100px", "width": "600px", "language": "en", "currency": "USD"}
      </script>
    </div>
    <script src="https://hub.waiker.ai/management/widget/earnings/waiker-performance-widget.cdn.iife.js" async>
      console.log("~~~~~~wowowo");
    </script>
    <script>
      console.log("~~~~~~222222");
    </script>
    <!-- Waiker Performance Widget END -->
  </body>
</html>`;

// answer에서 ```html ... ```, ```iframe ... ``` 코드블록, <iframe ...>...</iframe> 태그, <div ...>...</div> 등 주요 HTML 태그를 추출하는 함수
function parseAnswer(answer: string) {
  const htmlBlocks: string[] = [];
  const iframeBlocks: string[] = [];
  const scriptBlocks: string[] = [];
  let text = answer;

  // HTML 주석 제거
  text = text.replace(/<!--([\s\S]*?)-->/g, "");

  // <script>...</script> 태그 추출
  text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, (match) => {
    scriptBlocks.push(match);
    return "";
  });

  // ```iframe ... ``` 블록 추출
  text = text.replace(/```iframe\n([\s\S]*?)```/g, (_match, code) => {
    iframeBlocks.push(code.trim());
    return "";
  });

  // ```html ... ``` 블록 추출
  text = text.replace(/```html\n([\s\S]*?)```/g, (_match, code) => {
    htmlBlocks.push(code.trim());
    return "";
  });

  // <iframe ...>...</iframe> 태그 추출 (여러 개 가능)
  text = text.replace(/<iframe[\s\S]*?<\/iframe>/gi, (match) => {
    iframeBlocks.push(match.trim());
    return "";
  });

  // <div ...>...</div> 태그 추출 (여러 개 가능, 중첩은 단순 처리)
  text = text.replace(/<div[\s\S]*?<\/div>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  // <section ...>...</section> 태그 추출
  text = text.replace(/<section[\s\S]*?<\/section>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  // <article ...>...</article> 태그 추출
  text = text.replace(/<article[\s\S]*?<\/article>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  // <html ...>...</html> 태그 추출 (여러 개 가능, 중첩은 단순 처리)
  text = text.replace(/<html[\s\S]*?<\/html>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  // <head ...>...</head> 태그 추출 (여러 개 가능, 중첩은 단순 처리)
  text = text.replace(/<head[\s\S]*?<\/head>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  // <body ...>...</body> 태그 추출 (여러 개 가능, 중첩은 단순 처리)
  text = text.replace(/<body[\s\S]*?<\/body>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  return {
    text: text.trim(),
    htmlBlocks,
    iframeBlocks,
    scriptBlocks,
  };
}

export const ChatMessage = ({
  answer,
  isWaiting,
}: Omit<ChatMessageProps, "question">) => {
  let parsed = {
    text: answer || "",
    htmlBlocks: [] as string[],
    iframeBlocks: [] as string[],
    scriptBlocks: [] as string[],
  };
  // if (answer) {
  //   parsed = parseAnswer(answer);
  // }
  parsed = parseAnswer(temp);

  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptContainerRef.current) {
      scriptContainerRef.current.innerHTML = "";
      parsed.scriptBlocks.forEach((scriptStr) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = scriptStr;
        const scriptTag = tempDiv.querySelector("script");
        if (scriptTag) {
          const newScript = document.createElement("script");
          if (scriptTag.src) newScript.src = scriptTag.src;
          if (scriptTag.textContent)
            newScript.textContent = scriptTag.textContent;
          Array.from(scriptTag.attributes).forEach((attr) => {
            if (attr.name !== "src")
              newScript.setAttribute(attr.name, attr.value);
          });
          scriptContainerRef?.current?.appendChild(newScript);
        }
      });
    }
    return () => {
      if (scriptContainerRef.current) scriptContainerRef.current.innerHTML = "";
    };
  }, [parsed.scriptBlocks]);

  console.log(parsed);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 질문 */}
      {/* <div className="self-end bg-green700 text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-lg max-w-[70%] text-base animate-fade-in">
        {question}
      </div> */}

      {/* 대기 중인 경우 로딩 표시 */}
      {isWaiting && <LoadingIndicator />}

      {/* 답변 텍스트 */}
      {/* {parsed.text && (
        <div
          className="self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in"
          style={{ whiteSpace: "pre-line" }}
        >
          {parsed.text}
        </div>
      )} */}

      {/* HTML 코드블록 및 주요 태그 렌더링 */}
      {/* {parsed.htmlBlocks.length > 0 && (
        <div className="w-[375px] h-[800px] flex items-center justify-center">
          <div
            className="self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in w-full h-full"
            dangerouslySetInnerHTML={{ __html: parsed.htmlBlocks.join("\n") }}
          />
        </div>
      )} */}

      {/* iframe 코드블록 및 태그 렌더링 */}
      {/* {parsed.iframeBlocks.map((code, idx) => (
        <div
          key={"iframe-" + idx}
          className="w-[500px] h-[800px] flex items-center justify-center"
        >
          <div className="self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in w-full h-full">
            <span dangerouslySetInnerHTML={{ __html: code }} />
          </div>
        </div>
      ))} */}

      {/* <div
        id="test2"
        dangerouslySetInnerHTML={{
          __html: `<html>
  <head>
    <link
      rel="stylesheet"
      href="https://hub.waiker.ai/management/widget/earnings/waiker-performance-widget.cdn.css"
    />
  </head>
  <body>
    <!-- Waiker Performance Widget BEGIN -->
    <div class="waiker-performance-widget-container">
      <div class="waiker-performance-widget-container__widget"></div>
      <script type="application/json" async>
        {"ric": "AAPL.O", "height": "610px", "width": "980px", "language": "en", "currency": "USD"}
        console.log("~~~~~~wowowo");
      </script>
    </div>
    <script src="https://hub.waiker.ai/management/widget/earnings/waiker-performance-widget.cdn.iife.js" async></script>
    <!-- Waiker Performance Widget END -->
  </body>
</html>
`,
        }}
      ></div> */}

      <HtmlRenderer
        htmlString={`
<iframe
    id="5b967aa1-0282-41b0-836b-a68cc39ee88c" 
    src="https://qa-embed.waiker.ai/preview?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS2V5IjoiYmZjNjhjMTBiYzljNGQxODg3ZjA5OGY5MGJmNWFjOWUifQ.dFUBr-7fACm7Stvz1QH5ax7YbDtnT8Aeg-UuRwVdQQE&ric=TSLA.O"
    class="h-full w-full"
></iframe>  

<script>
  const iframeDiv = document.getElementById('5b967aa1-0282-41b0-836b-a68cc39ee88c');
    
  iframeDiv.onload = () => {
    iframeDiv.contentWindow.postMessage(
      {
        type: 'update_config',
        data: {
            productKey: 'WAIKER-WIDGET-369',
            configData: {
                "theme": "system",
                "lang": "en",
                "currency": {"hide": false, "defaultCurrency": "USD", "exchangeCurrency": "USD"},
                "data": [{"sort": 1, "typeDetail": "ITEM_MODULE", "componentName": "PoliticianStockTransaction"}]
            }
        },
      },
      '*'
    );
  };
</script>
`}
      />
      <div ref={scriptContainerRef} />
    </div>
  );
};

function HtmlRenderer({ htmlString }: { htmlString: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!iframeRef.current || !htmlString) return;
    // HTML 문자열을 blob URL로 변환
    const blob = new Blob([htmlString], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    // iframe에 HTML 로드
    iframeRef.current.src = url;
    // 정리 작업
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [htmlString]);
  return (
    <iframe
      sandbox="allow-scripts allow-same-origin allow-forms"
      className="w-full min-h-[600px] border-0"
      title="Dynamic HTML Content"
      ref={iframeRef}
    />
  );
}
