import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SchemeDetailsDialogProps {
  scheme: {
    title: string;
    description: string;
    summary?: string;
    image_url?: string;
    eligibility?: string;
    benefits?: string;
    how_to_apply?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SchemeDetailsDialog = ({
  scheme,
  isOpen,
  onClose,
}: SchemeDetailsDialogProps) => {
  if (!scheme) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{scheme.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-6 py-4">
            {scheme.image_url && (
              <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                <img
                  src={scheme.image_url}
                  alt={scheme.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            
            <div className="space-y-4">
              {scheme.summary && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-gray-700">{scheme.summary}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{scheme.description}</p>
              </div>

              {scheme.eligibility && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{scheme.eligibility}</p>
                </div>
              )}

              {scheme.benefits && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{scheme.benefits}</p>
                </div>
              )}

              {scheme.how_to_apply && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">How to Apply</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{scheme.how_to_apply}</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
