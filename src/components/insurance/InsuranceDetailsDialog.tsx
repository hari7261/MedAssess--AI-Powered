import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface InsuranceDetailsDialogProps {
  policy: {
    policy_name: string;
    insurer: string;
    premium: number;
    coverage: string;
    eligibility: string;
    benefits: string;
    exclusions: string;
    redirect_link: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InsuranceDetailsDialog = ({
  policy,
  isOpen,
  onClose,
}: InsuranceDetailsDialogProps) => {
  if (!policy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{policy.policy_name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Insurer</h3>
                <p className="text-gray-700">{policy.insurer}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Premium</h3>
                <p className="text-gray-700">₹{policy.premium}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Coverage</h3>
                <p className="text-gray-700">{policy.coverage}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
                <p className="text-gray-700">{policy.eligibility}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{policy.benefits}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Exclusions</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{policy.exclusions}</p>
              </div>

              <Button className="w-full" onClick={() => window.open(policy.redirect_link, '_blank')}>
                Apply Now
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
