import { Button, Modal, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { createLesson, getLessons } from "../../services/firestore";
import { useEffect, useState } from "react";
import { Lesson } from "../../types";

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
      date: new Date().toISOString(),
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
      {lessons.map((lesson) => (
        <div key={lesson.id}>
          <Button onClick={() => handleOpen(lesson)}>{lesson.title}</Button>
          <Button onClick={() => navigate(`/createEditLesson/${lesson.id}`)}>
            Edit
          </Button>
        </div>
      ))}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>{selectedLesson?.title}</h2>
          <p>{selectedLesson?.content}</p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default TeacherDashboard;
