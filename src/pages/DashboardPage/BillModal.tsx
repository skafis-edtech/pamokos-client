import { Box, Button, Modal } from "@mui/material";

interface BillModalProps {
  open: boolean;
  onClose: () => void;
}

const BillModal: React.FC<BillModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 w-[800px] max-w-full h-[500px]">
        <div>Amount: </div>
        <Button
          color="info"
          variant="outlined"
          onClick={onClose}
          style={{ position: "absolute", right: "10px", top: "10px" }}
        >
          ❌
        </Button>
      </Box>
    </Modal>
  );
};

export default BillModal;
