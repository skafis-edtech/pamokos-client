import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteLesson, fetchLesson, updateLesson } from "../services/firestore";
import { Button, TextField } from "@mui/material";
import { LessonCreate } from "../types";

const CreateEditLessonPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonCreate | null>(null);

  useEffect(() => {
    if (id) {
      fetchLesson(id).then((data) => setLesson(data));
    }
  }, [id]);

  return (
    <div>
      <h1>CreateEditLesson</h1>
      <p>{currentUser?.email || "Kraunasi..."}</p>
      <p>{id || "Kraunasi..."}</p>
      {id && (
        <Button
          color="error"
          onClick={() => deleteLesson(id).then(() => navigate("/dashboard"))}
        >
          Delete
        </Button>
      )}

      {id && lesson && (
        <Button
          onClick={() =>
            updateLesson(id, lesson).then(() => navigate("/dashboard"))
          }
        >
          Save
        </Button>
      )}
      {lesson && (
        <div>
          <TextField
            label="Title"
            value={lesson.title}
            onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Group ID"
            value={lesson.groupId}
            onChange={(e) => setLesson({ ...lesson, groupId: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date starts"
            value={lesson.startedAt}
            onChange={(e) =>
              setLesson({ ...lesson, startedAt: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date ends"
            value={lesson.endedAt}
            onChange={(e) => setLesson({ ...lesson, endedAt: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Content"
            value={lesson.content}
            onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Recording"
            value={lesson.recording}
            onChange={(e) =>
              setLesson({ ...lesson, recording: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Meeting Link"
            value={lesson.meetingLink}
            onChange={(e) =>
              setLesson({ ...lesson, meetingLink: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Participated"
            value={lesson.participated.join(", ")}
            onChange={(e) =>
              setLesson({ ...lesson, participated: e.target.value.split(", ") })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Only Use Content"
            value={lesson.onlyUseContent.join(", ")}
            onChange={(e) =>
              setLesson({
                ...lesson,
                onlyUseContent: e.target.value.split(", "),
              })
            }
            fullWidth
            margin="normal"
          />
        </div>
      )}
    </div>
  );
};

export default CreateEditLessonPage;
