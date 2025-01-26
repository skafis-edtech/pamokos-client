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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            mb: 2,
            border: "4px solid #2E7D32",
            bgcolor: "#E8F5E9",
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={() => {
            alert(`Clicked`);
          }}
        >
          <Typography
            variant="h6"
            sx={{ flex: 1, textAlign: "left", gap: 2, display: "flex" }}
          >
            <span>{lesson.startedAt.substring(5, 10)}</span>
            <span>
              <strong>{lesson.startedAt.substring(11, 16)}</strong>-
              {lesson.endedAt.substring(11, 16)}
            </span>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#2E7D32",
              fontWeight: "bold",
              flex: 1,
              textAlign: "center",
            }}
          >
            PRISIJUNGTI IR UŽSIRAŠYTI
          </Typography>
          <Typography
            variant="h6"
            sx={{ flex: 1, fontStyle: "italic", textAlign: "right" }}
          >
            {lesson.title}
          </Typography>
        </Paper>
      </>
    );
  } else if (state === "PAST" || state === "LOCKED") {
    return (
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          mb: 2,
          cursor: lesson.locked ? "default" : "pointer",
          bgcolor: lesson.locked ? "#e2e2e2" : "#F5F5F5",
          "&:hover": {
            boxShadow: !lesson.locked ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "",
          },
        }}
        onClick={() => {
          if (!lesson.locked) {
            handleOpen(lesson);
          }
        }}
      >
        <Typography variant="h6" sx={{ flex: 1, textAlign: "left" }}>
          {lesson.startedAt.substring(5, 10)}
        </Typography>
        <Typography
          variant="h6"
          sx={{ flex: 1, fontWeight: "bold", textAlign: "center" }}
        >
          {lesson.title}
        </Typography>
        <Typography variant="h6" sx={{ flex: 1, textAlign: "right" }}>
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
