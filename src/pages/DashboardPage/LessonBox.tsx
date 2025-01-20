import { Lesson, LessonState } from "../../types";

interface LessonBoxProps {
  lesson: Lesson;
  state: LessonState;
}

const LessonBox: React.FC<LessonBoxProps> = ({ lesson }) => {
  return (
    <>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
    </>
  );
};

export default LessonBox;
