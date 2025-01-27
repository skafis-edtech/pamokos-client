import { Box, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router";
import { Lesson } from "../../types";
import { useAuth } from "../../context/AuthContext";

interface LessonModalProps {
  lesson: Lesson | null;
  open: boolean;
  handleClose: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  open,
  handleClose,
}) => {
  const navigate = useNavigate();
  const { role } = useAuth();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 w-[1000px] h-[500px]">
        <h2>{lesson?.title || "Error: No lesson selected"}</h2>
        <p>{lesson?.content}</p>

        <p>
          <strong>Started At:</strong> {lesson?.startedAt}
        </p>
        <p>
          <strong>Ended At:</strong> {lesson?.endedAt}
        </p>
        <p>
          <strong>Recording:</strong> {lesson?.recording}
        </p>
        <p>
          <strong>Meeting Link:</strong> {lesson?.meetingLink}
        </p>
        {role === "TEACHER" && (
          <>
            <p>
              <strong>Participated:</strong> {lesson?.participated.join(", ")}
            </p>
            <p>
              <strong>Only Use Content:</strong>{" "}
              {lesson?.onlyUseContent.join(", ")}
            </p>
          </>
        )}
        <Button
          color="info"
          variant="outlined"
          onClick={handleClose}
          style={{ position: "absolute", right: "10px", top: "10px" }}
        >
          ❌
        </Button>
        {role === "TEACHER" && (
          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate(`/createEditLesson/${lesson?.id}`)}
          >
            Edit
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default LessonModal;
