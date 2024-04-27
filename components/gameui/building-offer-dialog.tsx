import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useDialogStore from "@/store/useDialogStore";

export default function BuildingOfferDialog() {
  const { buildingOfferDialog, setDialogState } = useDialogStore();

  return (
    <>
      <button onClick={() => setDialogState('buildingOfferDialog', true)}>Open Dialog</button>
      <Dialog open={buildingOfferDialog} onOpenChange={() => setDialogState('buildingOfferDialog', false)}>
        <DialogContent>
          <p>This is a BuildingOfferDialog</p>
          <button onClick={() => setDialogState('buildingOfferDialog', false)}>Close</button>
        </DialogContent>
      </Dialog>
    </>
  );
}