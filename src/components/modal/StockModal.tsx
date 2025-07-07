/* eslint-disable @typescript-eslint/no-unused-vars */
import { useModalStore } from '@/stores/modalStore';
import CalendarModal from './CalendarModal';

// interface StockModalProps {
//   ric: string;
// }

export default function StockModal() {
  const { openModal } = useModalStore();
  return (
    <div>
      <div>asdfasdf</div>

      <button
        onClick={() => {
          console.log('111');
          openModal(CalendarModal, { ric: '2222' });
        }}
      >
        111
      </button>
    </div>
  );
}
