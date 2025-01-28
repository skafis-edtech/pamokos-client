import { Box, Modal } from "@mui/material";
import { Report } from "../../types";

interface ReportModalProps {
  report?: Report;
  open: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 w-[800px] max-w-full h-[500px]">
        <h1>{report?.from}</h1>
      </Box>
    </Modal>
  );
};

export default ReportModal;
