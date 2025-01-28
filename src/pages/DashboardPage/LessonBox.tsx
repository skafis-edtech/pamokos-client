import { Button, Paper, Typography } from "@mui/material";
import { Lesson, LessonState } from "../../types";
import { enroll } from "../../services/firestore";
import { useAuth } from "../../context/AuthContext";
import { applyTimeZoneOffset } from "../../constants";

interface LessonBoxProps {
  lesson: Lesson;
  state: LessonState;
  handleOpen: (lesson: Lesson) => void;
}

const LessonBox: React.FC<LessonBoxProps> = ({ lesson, state, handleOpen }) => {
  const { currentUser, role } = useAuth();
  if (state === "ONGOING") {
    return (
      <>
        <Paper
          elevation={3}
          className="flex flex-col sm:flex-row justify-between items-center p-3 mb-2 border-4 border-green-700 bg-green-100 cursor-pointer hover:shadow-lg"
          onClick={() => handleOpen(lesson)}
        >
          <Typography variant="h6" className="flex-1 text-left gap-2 flex">
            <span>{lesson.startedAt.substring(5, 10)}</span>
            <span>
              <strong>
                {applyTimeZoneOffset(new Date(lesson.startedAt))
                  .toISOString()
                  .substring(11, 16)}
              </strong>
              -
              {applyTimeZoneOffset(new Date(lesson.endedAt))
                .toISOString()
                .substring(11, 16)}
            </span>
          </Typography>
          <Typography
            variant="h5"
            className="text-green-700 font-bold flex-1 text-center"
          >
            {role === "TEACHER"
              ? "PERŽIŪRĖTI TURINĮ"
              : "PRISIJUNGTI IR UŽSIRAŠYTI"}
          </Typography>
          <Typography variant="h6" className="flex-1 italic text-right">
            {lesson.title}
          </Typography>
        </Paper>
      </>
    );
  } else if (state === "PAST") {
    return (
      <Paper
        elevation={2}
        className="flex flex-col sm:flex-row justify-between items-center p-4 mb-2 cursor-pointer bg-gray-100 hover:shadow-lg"
        onClick={() => handleOpen(lesson)}
      >
        <Typography variant="h6" className="flex-1 text-left">
          {lesson.startedAt.substring(5, 10)}
        </Typography>
        <Typography variant="h6" className="flex-1 font-bold text-center">
          {lesson.title}
        </Typography>
        <Typography variant="h6" className="flex-1 text-right"></Typography>
      </Paper>
    );
  } else if (state === "LOCKED") {
    return (
      <Paper
        elevation={2}
        className="flex flex-col sm:flex-row justify-between items-center p-2 mb-2 cursor-default bg-gray-300"
        sx={{ backgroundColor: "#c0c0c0" }}
      >
        <Typography variant="h6" className="flex-1 text-left">
          {lesson.startedAt.substring(5, 10)}
        </Typography>
        <Typography variant="h6" className="flex-1 font-bold text-center">
          {lesson.title}
        </Typography>
        <Typography variant="h6" className="flex-1 text-right">
          <Button
            variant="outlined"
            onClick={async (e) => {
              e.stopPropagation();
              if (!currentUser) return;
              await enroll(lesson.id, currentUser.uid);
              window.location.reload();
            }}
          >
            ATRAKINTI IR UŽSIRAŠYTI
          </Button>
        </Typography>
      </Paper>
    );
  }
};

export default LessonBox;
