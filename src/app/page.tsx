"use client";

import Discover from "@/components/discover";
import ExtendedContinentDrawer from "@/components/drawer";
import GlobeWrapper from "@/components/globewrapper";
import SettingsComponent from "@/components/settings";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from 'react';
export interface Continent {
  id: string;
  name: string;
  lat: number;
  lng: number;
  size: number;
  continentPath: string;
  color: string;
  images: string[];
  description: string;
  story: string;
  references: string[];
  narrationPath: string;
  imageReferences: string[];
}

const continents: Continent[] = [
  {
    id: "north-america",
    name: 'North America', lat: 37, lng: -100, size: 40, color: 'red', images: [
      "/img/north-america/na1.png",
      "/img/north-america/na2.png",
      "/img/north-america/na3.png",
    ], description: `Carbon emissions in North America come from the intensive use of fossil fuels for power generation. The United States, a major player, relies on coal, oil, and natural gas to power its large industrial base. Transmission networks and power stations, such as power plants in the states of West Virginia and Wyoming. A lot of carbon dioxide is released. Currently, the increased use of gasoline and diesel in vehicles across the country is increasing greenhouse gas emissions. Also, industrial activities such as manufacturing and petrochemical production are located in areas such as the Straits of Thailand. It plays an important role in carbon dioxide emissions. Canada's oil sands operations in Alberta emit significant amounts of coal due to the intensive extraction and processing of bitumen.`, story: '', references: [
      "Statista. (2023, December 11). Historical CO₂ emissions in the U.S. 1800-2022. https://www.statista.com/statistics/1224630/cumulative-co2-emissions-united-states-historical/",
      "Canada, E. a. C. C. (2024, May 2). Greenhouse gas emissions. Canada.ca. https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/greenhouse-gas-emissions.html",
      "Canada, E. a. C. C. (2024, May 6). Where Canada's greenhouse gas emissions come from: 2024 National Greenhouse Gas Inventory. Canada.ca. https://www.canada.ca/en/environment-climate-change/news/2024/05/where-canadas-greenhouse-gas-emissions-come-from-2024-national-greenhouse-gas-inventory.html"
    ],
    narrationPath: "/sound/north-america.mp3",
    continentPath: "/map/na.png",
    imageReferences: [
      "https://albertaworker.ca/politics/alberta-oil-extraction-uses-a-lot-of-energy/",
      "https://www.reuters.com/business/energy/us-oil-refiners-defy-heat-run-plants-mid-90-capacity-2023-08-09/",
      "https://www.sightline.org/2019/05/10/how-new-york-won-congestion-pricing/"
    ]
  },
  {
    id: "europe",
    name: 'Europe', lat: 51, lng: 20, size: 40, color: 'blue', images: [
      "/img/europe/eu1.png",
      "/img/europe/eu2.png",
      "/img/europe/eu3.png",
    ], description: `In Europe, most carbon emissions come from energy production, transport, and industrial processes. Countries like Germany and Poland still rely on coal-fired power plants, which are the main source of CO2. An extensive highway network and large numbers of vehicles, particularly in countries such as Italy and France, contribute to transport-related emissions. Industrial regions in countries like Germany, known for their automotive and manufacturing industries, are increasing CO2 emissions. The steel industry in countries such as England and Spain also accounts for a large share of emissions due to the energy required for steel production.`, story: '', references: [
      "Ritchie, H., Roser, M., & Rosado, P. (2020, May 11). CO₂ and Greenhouse Gas Emissions. Our World in Data. https://ourworldindata.org/co2/country/united-kingdom",
      "Carbon footprint for the UK and England to 2021. (2024, May 15). GOV.UK. https://www.gov.uk/government/statistics/uks-carbon-footprint/carbon-footprint-for-the-uk-and-england-to-2019",
      "Statista. (2024, June 12). CO₂ emissions in Germany - statistics & facts. https://www.statista.com/topics/10972/co2-emissions-in-germany/",
      "Climate action in Poland: Latest state of play | Think Tank | European Parliament. (n.d.). https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2021)698766"
    ],
    narrationPath: "/sound/europe.mp3",
    continentPath: "/map/europe.png",
    imageReferences: [
      "https://gmk.center/en/news/spain-increased-steel-production-by-10-m-m-in-may/",
      "https://www.ukconstructionmedia.co.uk/news/highways-england-announce-new-contracts/",
      "https://www.npr.org/2022/09/27/1124448463/germany-coal-energy-crisis"
    ]
  },
  {
    id: "africa",
    name: 'Africa', lat: 10, lng: 26, size: 40, color: 'green', images: [
      "/img/africa/africa1.png",
      "/img/africa/africa2.png",
      "/img/africa/africa3.png",
    ], description: `Most of Africa's carbon emissions come from deforestation in the Congo Valley, where large areas of rainforest have been cleared for agriculture and logging. Land use change in Nigeria also contributes to the continent's carbon footprint as land is converted to agriculture and urban development. South Africa's coal-fired power plants also emit large amounts of carbon dioxide, which speaks to the country's dependence on fossil fuels. In contrast, methane emissions come from large livestock farms in Ethiopia, where animals produce methane during digestion. Landfills in Kenya, such as Dandora, release methane as organic waste decomposes. In rural Uganda, burning leaves for cooking is a common practice that adds methane to the atmosphere.`, story: ``, references: [
      "World Bank Open Data. (n.d.). World Bank Open Data. https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?locations=NG",
      "World Bank Open Data. (n.d.). World Bank Open Data. https://data.worldbank.org/indicator/EN.ATM.METH.KT.CE?locations=UG",
      "CEICdata.com. (2024, October 1). Uganda Environmental: Gas emissions and air pollution. https://www.ceicdata.com/en/uganda/environmental-gas-emissions-and-air-pollution",
      "Bergen, M. (n.d.). Congo Basin deforestation threatens food and water supplies throughout Africa. World Resources Institute. https://www.wri.org/insights/congo-basin-deforestation-threatens-food-and-water-supplies-throughout-africa",
      "Angelsen, A., Ladewig, M., & Imbert, A. (2024, September 20). Mining in the Congo rainforest causes more deforestation than previously assumed. CIFOR-ICRAF Forests News. https://forestsnews.cifor.org/89558/mining-in-the-congo-rainforest-causes-more-deforestation",
      "Global Methane Initiative. (n.d.). https://www.globalmethane.org/(X(1)S(04f2ln1ignncgojfd2vfa1n5))/documents/ag_ethiopia_res_assessment.pdf"
    ],
    narrationPath: "/sound/africa.mp3",
    continentPath: "/map/africa.png",
    imageReferences: [
      "https://apnews.com/article/uganda-charcoal-ban-deforestation-vigilantes-dd0cbcd0e4515afe6be8c76c4a7f7cc6",
      "https://www.natureguardian.org/2021/10/climate-change-au-urged-to-address-threat-of-congo-forest-logging/",
      "https://www.jrsusa.org/story/equipping-farmers-for-climate-change-in-northeastern-nigeria/"
    ]
  },
  {
    id: "south-america",
    name: 'South America', lat: -14, lng: -51, size: 40, color: 'yellow', images: [
      "/img/south-america/sa1.png",
      "/img/south-america/sa2.png",
      "/img/south-america/sa3.png",
    ], description: `Most of the methane in South America comes from raising livestock, especially cattle, which produce methane during fermentation. Lands and mines also contribute to methane emissions. Measures to control these impacts include improved agriculture, improved waste management, and enhanced methane collection technologies. Countries like Brazil are focusing on raising animals to reduce the impact on the environment.`, story: '', references: [
      "Hancock, S. E., Jacob, D., Chen, Z., Nesser, H., Davitt, A., Varon, D. J., Sulprizio, M. P., Balasus, N., Estrada, L. A., East, J. D., Penn, E., Randles, C. A., Worden, J., Aben, I., Parker, R. J., & Maasakkers, J. D. (2024). Satellite quantification of methane emissions from South American countries A high-resolution inversion of TROPOMI and GOSAT observations. Copernicus Publications. https://doi.org/10.5194/egusphere-2024-1763",
      "CAF. (n.d.). Beyond CO2: methane challenges and opportunities in Latin America and the Caribbean | CAF. https://www.caf.com/en/knowledge/views/2024/01/beyond-co2-methane-challenges-and-opportunities-in-latin-america-and-the-caribbean/",
      "Cutting livestock methane emissions for stronger climate action. (2022, June 10). EntericMethane. https://www.fao.org/in-action/enteric-methane/news-and-events/news-detail/cutting-livestock-methane-emissions-for-stronger-climate-action/en",
      "Yuki. (2024, May 31). Sustainable farming practices in Latin America. The Borgen Project. https://borgenproject.org/sustainable-farming-practices-in-latin-america/"
    ],
    continentPath: "/map/sa.png",
    narrationPath: "/sound/south-america.mp3",
    imageReferences: [
      "https://www.ft.com/content/9225a0a0-5d2d-11e9-840c-530737425559",
      "https://storymaps.arcgis.com/stories/61f6fa34473149ec9ec37f3393791721",
      "https://ccafs.cgiar.org/news/climate-information-and-family-farming-stories-three-climate-smart-villages-latin-america "
    ]
  },
  {
    id: "asia",
    name: 'Asia', lat: 35, lng: 100, size: 40, color: 'purple', images: [
      "/img/asia/asia1.png",
      "/img/asia/asia2.png",
      "/img/asia/asia3.png",
    ], description: `The Asia-Pacific region, which includes major countries such as China and India, is the world's largest emitter of carbon dioxide. This is due to rapid industrialization, increasing use of coal for electricity generation, and the development of the transportation industry. Urbanization and rising energy demand contribute greatly to carbon emissions in the region. However, much has been done for green innovation, such as investment in renewable energy sources and stricter environmental regulations. Countries in the area also invest in technological innovation to reduce emissions and mitigate climate change.`, story: '', references: [
      "CO2 emissions in Southeast Asia in the Stated Policies and Sustainable Development scenarios, 2020-2050 - Charts - Data & Statistics - IEA. (n.d.-b). IEA. https://www.iea.org/data-and-statistics/charts/co2-emissions-in-southeast-asia-in-the-stated-policies-and-sustainable-development-scenarios-2020-2050",
      "Asia Pacific - Countries & Regions - IEA. (n.d.). IEA. https://www.iea.org/regions/asia-pacific/emissions",
      "Feng, S., Shafiei, M. W. M., Ng, T. F., Ren, J., & Jiang, Y. (2024). The intersection of economic growth and environmental sustainability in China: Pathways to achieving SDG. Energy Strategy Reviews, 55, 101530. https://doi.org/10.1016/j.esr.2024.101530",
      "Xiuhui, J., & Raza, M. Y. (2022). Delving into Pakistan's industrial economy and carbon mitigation: An effort toward sustainable development goals. Energy Strategy Reviews, 41, 100839. https://doi.org/10.1016/j.esr.2022.100839",
      "Alkhathlan, K., & Javid, M. (2015). Carbon emissions and oil consumption in Saudi Arabia. Renewable and Sustainable Energy Reviews, 48, 105-111. https://doi.org/10.1016/j.rser.2015.03.072",
      "Liu, B., Guan, Y., Shan, Y., Cui, C., & Hubacek, K. (2022). Emission growth and drivers in Mainland Southeast Asian countries. Journal of Environmental Management, 329, 117034. https://doi.org/10.1016/j.jenvman.2022.117034"

    ],
    narrationPath: "/sound/asia.mp3",
    continentPath: "/map/asia.png",
    imageReferences: [
      "https://www.japantimes.co.jp/news/2020/05/13/business/coronavirus-stimulus-coal-southeast-asia-japan/",
      "https://www.businessinsider.com/new-delhi-smog-air-pollution-photos-2019-11",
      "https://totalenergies.com/projects/oil/amiral-petrochemical-complex-integrated-satorp-refinery"
    ]
  },
  {
    id: "australia",
    name: 'Australia', lat: -25, lng: 133, size: 40, color: 'orange', images: [
      "/img/australia/aus1.png",
      "/img/australia/aus2.png",
      "/img/australia/aus3.png",
    ], description: `As a continent, Australia faces significant challenges in carbon emissions, mainly due to the burning of fossil fuels for energy and transport and deforestation. The large coal industry plays an important role, where coal-fired power plants generate electricity, leading to high CO2 emissions. In addition, Australia's mining sector, which produces coal, iron ore and other minerals, contributes to carbon emissions through the use of heavy machinery and transport. Deforestation caused by the expansion of agriculture, especially animal husbandry, increases the ecological footprint. The logging industry also plays a role in the conversion of forests to timber.`, story: '', references: [
      "The Australia Institute. (2024, October 4). Coal Mine Tracker | The Australia Institute. https://australiainstitute.org.au/initiative/coal-mine-tracker/",
      "Bradshaw, C. J. A. (2012). Little left to lose: deforestation and forest degradation in Australia since European colonization. Journal of Plant Ecology, 5(1), 109-120. https://doi.org/10.1093/jpe/rtr038"
    ],
    continentPath: "/map/aus.png",
    narrationPath: "/sound/australia.mp3",
    imageReferences: ["https://www.cnn.com/2021/09/06/business/australia-warned-climate-coal-intl-hnk/index.html", "https://bilyonaryo.com/2023/09/06/australia-plan-to-close-largest-coal-power-station-in-doubt/power/", "https://optraffic.com/blog/australia-traffic-congestion-cause-and-solution/ "]
  },
];


const Page = () => {
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
  const [clickedContinents, setClickedContinents] = useState<{ [key: string]: boolean; }>({});
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const allContinentsClickedRef = useRef(false);

  const handleContinentSelect = (continent: Continent) => {
    setClickedContinents(prev => ({ ...prev, [continent.name]: true }));
    setSelectedContinent(prevContinent =>
      prevContinent?.name === continent.name ? null : continent
    );
  };

  useEffect(() => {
    const allContinentsClicked = continents.every(continent => clickedContinents[continent.name]);
    allContinentsClickedRef.current = allContinentsClicked;
  }, [clickedContinents]);

  useEffect(() => {
    if (allContinentsClickedRef.current && selectedContinent === null) {
      setShowVideoPopup(true);
      setSoundEnabled(false);
    }
  }, [selectedContinent]);

  useEffect(() => {
    if (showVideoPopup && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideoPopup]);

  const handleCloseContinent = () => {
    setSelectedContinent(null);
  };

  return (
    <main className="w-full">
      <Discover soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
      <SettingsComponent {
        ...{ soundEnabled, setSoundEnabled, volume, setVolume }
      } />
      <GlobeWrapper
        continents={continents}
        onSelectContinent={handleContinentSelect}
        selectedContinent={selectedContinent}
      />
      <ExtendedContinentDrawer
        selectedContinent={selectedContinent}
        onClose={handleCloseContinent}
      />
      <div className="fixed inset-x-0 z-40 bottom-0 p-1 sm:p-2 bg-transparent">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 max-w-3xl mx-auto">
          {continents.map((continent) => (
            <Button
              key={continent.name}
              variant="outline"
              onClick={() => handleContinentSelect(continent)}
              className={`${clickedContinents[continent.name] ? "bg-green-500 hover:bg-green-600 text-white" : ""}`}
            >
              {continent.name}
            </Button>
          ))}
        </div>
      </div>
      {showVideoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="w-11/12 h-11/12 max-w-4xl max-h-[80vh]">
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              autoPlay
              src="/ENDING.mp4"
            >
              Your browser does not support the video tag.
            </video>
            <Button
              className="mt-4 bg-white text-black hover:bg-gray-200"
              onClick={() => {
                setShowVideoPopup(false);
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0;
                }
              }}
            >
              Close Video
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;