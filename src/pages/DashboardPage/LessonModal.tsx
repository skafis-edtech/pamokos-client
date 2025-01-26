import { Box, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router";
import { Lesson } from "../../types";

interface LessonModalProps {
  lesson: Lesson | null;
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
  width: 1000,
  height: 500,
};

const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  open,
  handleClose,
}) => {
  const navigate = useNavigate();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
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
        <p>
          <strong>Participated:</strong> {lesson?.participated.join(", ")}
        </p>
        <p>
          <strong>Only Use Content:</strong> {lesson?.onlyUseContent.join(", ")}
        </p>

        <Button
          color="info"
          variant="outlined"
          onClick={handleClose}
          style={{ position: "absolute", right: "10px", top: "10px" }}
        >
          ❌
        </Button>

        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate(`/createEditLesson/${lesson?.id}`)}
        >
          Edit
        </Button>
      </Box>
    </Modal>
  );
};

export default LessonModal;
