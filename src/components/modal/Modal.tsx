import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useModalStore } from '@/stores/modalStore';
import { ChevronLeft, X } from 'lucide-react';

export default function Modal() {
  const { open, stack, closeModal, back } = useModalStore();
  if (!open || stack.length === 0) return null;

  const { component: Component, props } = stack[stack.length - 1];

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-ground2 border-none [&>button]:hidden px-12">
        <DialogHeader className="flex flex-row items-center w-full">
          {stack.length > 1 && (
            <button
              onClick={back}
              className="flex items-center gap-1 text-sm font-medium cursor-pointer"
            >
              <ChevronLeft className="size-6" strokeWidth={1.5} />
            </button>
          )}
          <div className="flex-1" />
          <button onClick={closeModal} className="cursor-pointer self-end">
            <X className="size-6" strokeWidth={1.5} />
          </button>
        </DialogHeader>
        <div className="py-8">
          <Component {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
