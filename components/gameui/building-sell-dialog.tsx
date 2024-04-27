import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useDialogStore from "@/store/useDialogStore";

export default function BuildingSellDialog() {
  const { buildingSellDialog, setDialogState } = useDialogStore();

  return (
    <>
      <Dialog open={buildingSellDialog} onOpenChange={() => setDialogState('buildingSellDialog', false)}>
        <DialogContent>
          <p>This is a BuildingSellDialog</p>
          <button onClick={() => setDialogState('buildingSellDialog', false)}>Close</button>
        </DialogContent>
      </Dialog>
    </>
  );
}