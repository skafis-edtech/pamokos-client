import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import ReportModal from "./ReportModal";
import BillModal from "./BillModal";
import { useState } from "react";

interface BillLineProps {
  variant?: "SOLID" | "DOTTED";
  monthString: string;
}

const BillLine: React.FC<BillLineProps> = ({
  variant = "SOLID",
  monthString,
}) => {
  const { currentUser, role } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row items-center">
      <div
        className={`border-t-2 border-black w-full h-0 ${
          variant === "SOLID" ? "" : variant === "DOTTED" ? "border-dotted" : ""
        }`}
      ></div>
      <div className="w-fit mx-2">{monthString}</div>
      <div className="w-28">
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          sx={{ w: "100%" }}
        >
          {role === "TEACHER" ? "View report" : "View bill"}
        </Button>
      </div>

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
