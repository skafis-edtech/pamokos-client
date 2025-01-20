import { Button, Modal, Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { createLesson, getLessons } from "../../services/firestore";
import { useEffect, useState } from "react";
import { Lesson } from "../../types";
import LockIcon from "@mui/icons-material/Lock";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
};

const TeacherDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const groupId = "F8G4Xk6uQaB5REJDJ0l7"; // TODO:
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    getLessons(groupId).then((data) => setLessons(data));
  }, []);

  const initiateNew = (groupId: string) => {
    createLesson({
      groupId: groupId,
      title: "New Lesson",
      startedAt: new Date().toISOString(),
      endedAt: new Date().toISOString(),
      content: "",
      recording: "",
      meetingLink: "",
      participated: [],
      onlyUseContent: [],
    }).then((lessonId) => navigate(`/createEditLesson/${lessonId}`));
  };

  const handleOpen = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLesson(null);
  };

  return (
    <>
      <h1>Mokytojo {currentUser?.email || "Kraunasi..."} paskyra</h1>
      <Button onClick={() => initiateNew(groupId)}>New lesson</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>{selectedLesson?.title}</h2>
          <p>{selectedLesson?.content}</p>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => navigate(`/createEditLesson/${selectedLesson?.id}`)}
          >
            Edit
          </Button>
        </Box>
      </Modal>
      <Box p={2} sx={{ fontFamily: "'Roboto', sans-serif" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Grupė 12G
        </Typography>

        {/* PRISIJUNGTI Box */}
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
          <Typography variant="h6">12-05</Typography>
          <Typography
            variant="h5"
            sx={{ color: "#2E7D32", fontWeight: "bold" }}
          >
            PRISIJUNGTI
          </Typography>
          <Typography variant="h6">19:10</Typography>
        </Paper>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Aprašymas
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontStyle: "italic" }}>
          Welcome!
        </Typography>

        {/* List Items */}
        {lessons.map((item, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              mb: 2,
              cursor: item.locked ? "default" : "pointer",
              bgcolor: item.locked ? "#e2e2e2" : "#F5F5F5",
              "&:hover": {
                boxShadow: !item.locked
                  ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                  : "",
              },
            }}
            onClick={() => {
              if (!item.locked) {
                handleOpen(item);
              }
            }}
          >
            <Typography variant="h6">{item.startedAt} Pavadinimas</Typography>
            {item.locked && (
              <>
                <LockIcon />
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent onClick from firing
                    alert(`Unlock clicked on ${item.startedAt}`);
                  }}
                >
                  ATRAKINTI
                </Button>
              </>
            )}
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default TeacherDashboard;
