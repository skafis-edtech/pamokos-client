import { Button, Paper, Typography } from "@mui/material";
import { Lesson, LessonState } from "../../types";

interface LessonBoxProps {
  lesson: Lesson;
  state: LessonState;
  handleOpen: (lesson: Lesson) => void;
}

const LessonBox: React.FC<LessonBoxProps> = ({ lesson, state, handleOpen }) => {
  if (state === "ONGOING") {
    return (
      <>
        <Paper
          elevation={3}
          className="flex justify-between items-center p-2 mb-2 border-4 border-green-700 bg-green-100 cursor-pointer hover:shadow-lg"
          onClick={() => {
            alert(`Clicked`);
          }}
        >
          <Typography variant="h6" className="flex-1 text-left gap-2 flex">
            <span>{lesson.startedAt.substring(5, 10)}</span>
            <span>
              <strong>{lesson.startedAt.substring(11, 16)}</strong>-
              {lesson.endedAt.substring(11, 16)}
            </span>
          </Typography>
          <Typography
            variant="h5"
            className="text-green-700 font-bold flex-1 text-center"
          >
            PRISIJUNGTI IR UŽSIRAŠYTI
          </Typography>
          <Typography variant="h6" className="flex-1 italic text-right">
            {lesson.title}
          </Typography>
        </Paper>
      </>
    );
  } else if (state === "PAST" || state === "LOCKED") {
    return (
      <Paper
        elevation={2}
        className={`flex justify-between items-center p-2 mb-2 ${
          lesson.locked
            ? "cursor-default bg-gray-200"
            : "cursor-pointer bg-gray-100 hover:shadow-lg"
        }`}
        onClick={() => {
          if (!lesson.locked) {
            handleOpen(lesson);
          }
        }}
      >
        <Typography variant="h6" className="flex-1 text-left">
          {lesson.startedAt.substring(5, 10)}
        </Typography>
        <Typography variant="h6" className="flex-1 font-bold text-center">
          {lesson.title}
        </Typography>
        <Typography variant="h6" className="flex-1 text-right">
          {lesson.locked && (
            <>
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent onClick from firing
                  alert(`Unlock clicked on ${lesson.startedAt}`);
                }}
              >
                ATRAKINTI
              </Button>
            </>
          )}
        </Typography>
      </Paper>
    );
  }
};

export default LessonBox;
