import axios from "axios";
import useMapStore from "@/store/useMapStore";
import useBuildingStore, { Building } from "@/store/useBuildingStore";

// Define a new interface for the custom properties
interface CustomProperties {
  fid: number;
  "fill-color": string;
  owner_id?: number;
  forsale?: boolean;
}

const getColorForBuilding = (owner_id: number, forsale: boolean) => {
  if (owner_id === 1 && !forsale) return "navy";
  if (owner_id === 1 && forsale) return "orange";
  if (owner_id === 0 && !forsale) return "cyan";
  if (owner_id === 0 && forsale) return "green";
  return "#dee4f7";
};

export const loadBuildings = () => {
  const { mapbox } = useMapStore.getState();
  const { buildings } = useBuildingStore.getState();

  if (mapbox) {
    mapbox.on("load", () => {
      axios
        .get("/assets/geojson/karimkhan.geojson")
        .then((response) => {
          const data = response.data;
          const buildingMap: { [key: number]: Building } = {};

          buildings.forEach((building) => {
            buildingMap[building.fid] = building;
          });

          data.features.forEach((feature: GeoJSON.Feature<GeoJSON.Geometry, CustomProperties>) => {
            const fid = feature.properties.fid;
            const building = buildingMap[fid] || {};

            feature.properties = {
              ...feature.properties,
              ...building,
              "fill-color": getColorForBuilding(building.owner_id || 100 , building.forsale || false),
            };
          });

          mapbox.addSource("karimkhan", {
            type: "geojson",
            data: data,
          });

          mapbox.addLayer({
            id: "karimkhan",
            type: "fill",
            source: "karimkhan",
            paint: {
              "fill-color": ["case", ["has", "fill-color"], ["get", "fill-color"], "rgba(0, 0, 0, 0.1)"],
              "fill-outline-color": "rgba(0, 0, 0, 0.5)",
            },
          });
        })
        .catch((error) => {
          console.error("Error loading karimkhan.geojson:", error);
        });
    });
  }
};