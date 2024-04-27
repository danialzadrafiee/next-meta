import useGameuiStore from "@/store/useGameuiStore";
import useBuildingStore from "@/store/useBuildingStore";
import BuildingButtons from "@/components/gameui/building-drawer/building-drawer-buttons";
import BuildingSellDialog from "./building-sell-dialog";
interface BuildingProperties {
  fid: number;
  owner_id: number;
  forsale: boolean;
}

interface SelectedBuilding {
  properties: BuildingProperties;
}

export default function BuildingDrawer() {
  const { buildingDrawerShowing } = useGameuiStore();
  const { selectedBuilding } = useBuildingStore();

  if (!buildingDrawerShowing || !selectedBuilding) return null;

  const { fid, owner_id, forsale } = selectedBuilding.properties as BuildingProperties;

  return (
    <div className="fixed max-w-sm inset-x-0 bottom-0 mx-auto w-full bg-red-400 h-24">
      <div className="flex items-center justify-center">
        <div>
          {/* {fid}-{owner_id} */}
          <button onClick={() => setDialogState('buildingSellDialog', true)}>Open Dialog</button>
          <BuildingSellDialog/>

        </div>
        <BuildingButtons owner_id={owner_id} forsale={forsale} />
      </div>
    </div>
  );
}