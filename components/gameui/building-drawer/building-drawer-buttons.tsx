import { Button } from "@/components/ui/button";
import useDialogStore from "@/store/useDialogStore";

interface BuildingButtonsProps {
  owner_id: number;
  forsale: boolean;
}

const BuildingButtons = ({ owner_id, forsale }: BuildingButtonsProps) => {
  const isOwner = owner_id === 1;
  const { buildingSellDialog, setDialogState } = useDialogStore();

  if (isOwner) {
    return forsale ? (
      <>
        <Button variant="outline">For Sale</Button>
        <Button variant="outline">Offers</Button>
      </>
    ) : (
      <>
        <Button variant="outline">Sell</Button>
        <Button variant="outline">Offers</Button>
      </>
    );
  } else {
    return forsale ? (
      <>
        <Button variant="outline">Buy</Button>
        <Button variant="outline">Offer</Button>
      </>
    ) : (
      <Button variant="outline">Offer</Button>
    );
  }
};
export default BuildingButtons;
