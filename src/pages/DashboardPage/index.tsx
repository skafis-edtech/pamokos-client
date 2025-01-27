import { Button, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import {
  createLesson,
  getGroupData,
  getLessons,
  participate,
} from "../../services/firestore";
import { useEffect, useState } from "react";
import { Group, Lesson } from "../../types";
import LessonBox from "./LessonBox";
import LessonModal from "./LessonModal";

const DashboardPage: React.FC = () => {
  const { currentUser, role } = useAuth();
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

  const handleOpenInfo = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLesson(null);
  };

  const handleParticipate = async (lesson: Lesson) => {
    if (!currentUser) return;
    await participate(lesson.id, currentUser.uid);
    document.location.href = lesson.meetingLink;
  };

  return (
    <>
      <h1>
        {role === "STUDENT"
          ? "MOKINIO"
          : role === "TEACHER"
          ? "MOKYTOJO"
          : "..."}{" "}
        {currentUser?.email || "Kraunasi..."} paskyra
      </h1>{" "}
      <LessonModal
        lesson={selectedLesson}
        open={open}
        handleClose={handleClose}
      />
      <Box className="p-2 font-roboto">
        <Typography variant="h5" className="mb-2">
          Grupė {groupData?.name}
        </Typography>
        {role === "TEACHER" && (
          <Button
            variant="outlined"
            color="success"
            onClick={() => initiateNew(groupId)}
            className="p-2 w-full mb-28"
          >
            ➕
          </Button>
        )}

        {lessons
          .filter((item) => new Date(item.endedAt) > new Date())
          .map((item, index) => (
            <LessonBox
              key={index}
              lesson={item}
              state="ONGOING"
              handleOpen={
                role === "TEACHER" ? handleOpenInfo : handleParticipate
              }
            />
          ))}
        <Typography variant="body1" className="mb-28">
          Aprašymas
        </Typography>
        <Typography variant="body1" className="mb-4 italic">
          {groupData?.description}
        </Typography>
        {currentUser &&
          lessons
            .filter((item) => new Date(item.endedAt) <= new Date())
            .map((item, index) => (
              <LessonBox
                key={index}
                lesson={item}
                state={
                  role === "TEACHER" ||
                  item.participated.includes(currentUser.uid) ||
                  item.onlyUseContent?.includes(currentUser.uid)
                    ? "PAST"
                    : "LOCKED"
                }
                handleOpen={handleOpenInfo}
              />
            ))}
      </Box>
    </>
  );
};

export default DashboardPage;
