import { Button, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import {
  createLesson,
  getGroupData,
  getLessons,
} from "../../services/firestore";
import { useEffect, useState } from "react";
import { Group, Lesson } from "../../types";
import LessonBox from "./LessonBox";
import LessonModal from "./LessonModal";

const TeacherDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const groupId = "F8G4Xk6uQaB5REJDJ0l7"; // TODO:
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [groupData, setGroupData] = useState<Group | null>(null);

  useEffect(() => {
    getLessons(groupId).then((data) => setLessons(data));
    getGroupData(groupId).then((data) => setGroupData(data));
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
      <h1>Mokytojo {currentUser?.email || "Kraunasi..."} paskyra</h1>{" "}
      <LessonModal
        lesson={selectedLesson}
        open={open}
        handleClose={handleClose}
      />
      <Box className="p-2 font-roboto">
        <Typography variant="h5" className="mb-2">
          Grupė {groupData?.name}
        </Typography>
        <Button
          variant="outlined"
          color="success"
          onClick={() => initiateNew(groupId)}
          className="p-2 w-full mb-28"
        >
          ➕
        </Button>

        {lessons
          .filter((item) => new Date(item.endedAt) > new Date())
          .map((item, index) => (
            <LessonBox
              key={index}
              lesson={item}
              state="ONGOING"
              handleOpen={handleOpen}
            />
          ))}
        <Typography variant="body1" className="mb-28">
          Aprašymas
        </Typography>
        <Typography variant="body1" className="mb-4 italic">
          {groupData?.description}
        </Typography>
        {lessons
          .filter((item) => new Date(item.endedAt) <= new Date())
          .map((item, index) => (
            <LessonBox
              key={index}
              lesson={item}
              state="PAST"
              handleOpen={handleOpen}
            />
          ))}
      </Box>
    </>
  );
};

export default TeacherDashboard;
