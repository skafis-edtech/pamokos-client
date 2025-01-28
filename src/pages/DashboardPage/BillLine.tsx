import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import ReportModal from "./ReportModal";
import BillModal from "./BillModal";
import { useState } from "react";

const BillLine = ({ variant = "SOLID" }) => {
  const { currentUser, role } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row items-center">
      <div
        className={`border-t-2 border-black w-full h-0 mr-1 ${
          variant === "SOLID" ? "" : variant === "DOTTED" ? "border-dotted" : ""
        }`}
      ></div>
      <div className="w-24">2025 sausis</div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        hi
      </Button>
      {currentUser && role === "TEACHER" && (
        <ReportModal open={open} onClose={() => setOpen(false)} />
      )}
      {currentUser && role === "STUDENT" && (
        <BillModal open={open} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export default BillLine;
