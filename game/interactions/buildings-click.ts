import useMapStore from "@/store/useMapStore";
import useGameuiStore from "@/store/useGameuiStore";
import useBuildingStore from "@/store/useBuildingStore";

export const handleBuildingClick = () => {
  const { mapbox } = useMapStore.getState();
  const { setBuildingDrawerShowing } = useGameuiStore.getState();
  const { setSelectedBuilding } = useBuildingStore.getState();

  if (mapbox) {
    mapbox.on("load", () => {
      mapbox.on("click", "karimkhan", (e) => {
        const features = mapbox.queryRenderedFeatures(e.point, {
          layers: ["karimkhan"],
        });

        if (features.length > 0) {
          const selectedFeature = features[0];
          if (selectedFeature) {
            setSelectedBuilding(selectedFeature);
            mapbox.setPaintProperty("karimkhan", "fill-color", [
              "case",
              ["==", ["get", "fid"], selectedFeature.properties?.fid],
              "#a3e39c",
              ["has", "fill-color"],
              ["get", "fill-color"],
              "red",
            ]);
          }
          setBuildingDrawerShowing(true);
        }
      });
    });
  }
};
