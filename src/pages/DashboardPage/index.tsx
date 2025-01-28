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
import {
  defaultEndTime,
  defaultGroupId,
  defaultStartTime,
} from "../../constants";
import BillLine from "./BillLine";

const DashboardPage: React.FC = () => {
  const { currentUser, role } = useAuth();
  const navigate = useNavigate();
  const groupId = defaultGroupId;
  const [pastLessons, setPastLessons] = useState<Lesson[]>([]);
  const [newLessons, setNewLessons] = useState<Lesson[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [groupData, setGroupData] = useState<Group | null>(null);

  useEffect(() => {
    getLessons(groupId).then((data) => {
      setPastLessons(
        data.filter((item) => new Date(item.endedAt) <= new Date())
      );
      setNewLessons(data.filter((item) => new Date(item.endedAt) > new Date()));
    });
    getGroupData(groupId).then((data) => setGroupData(data));
  }, []);

  const initiateNew = (groupId: string) => {
    createLesson({
      groupId: groupId,
      title: "Nauja pamoka",
      startedAt: defaultStartTime.toISOString(),
      endedAt: defaultEndTime.toISOString(),
      content: "https://miro.com/app/board/...",
      recording: "https://drive.google.com/...",
      meetingLink: "https://teams.microsoft.com/...",
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

        {newLessons.map((item, index) => (
          <LessonBox
            key={index}
            lesson={item}
            state="ONGOING"
            handleOpen={role === "TEACHER" ? handleOpenInfo : handleParticipate}
          />
        ))}
        <Typography variant="body1" className="mb-28">
          Aprašymas
        </Typography>
        <Typography variant="body1" className="mb-4 italic">
          {groupData?.description}
        </Typography>
        {currentUser &&
          pastLessons.map((item, index) => (
            <div key={index}>
              {index === 0 ||
              new Date(item.endedAt).getMonth() !==
                new Date(pastLessons[index - 1]?.endedAt).getMonth() ? (
                <BillLine variant={index === 0 ? "DOTTED" : "SOLID"} />
              ) : null}
              <LessonBox
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
            </div>
          ))}
      </Box>
    </>
  );
};

export default DashboardPage;
