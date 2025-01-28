import { Modal } from "@mui/material";
import { Bill } from "../../types";

interface BillModalProps {
  bill?: Bill;
  open: boolean;
  onClose: () => void;
}

const BillModal: React.FC<BillModalProps> = ({ bill, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>Amount: {bill?.amount}</div>
    </Modal>
  );
};

export default BillModal;
