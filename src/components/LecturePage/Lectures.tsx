import React from "react";
import { FiCheck, FiClock } from "react-icons/fi";
import styles from "../../styles/LecturePage/Lectures.module.css";
import classNames from "classnames";

type Props = {
  data: Array<{
    title: string;
    duration: number;
    progress: number;
  }>;
};

const ProgressIcon = (props: { progress: number; size: number }) => {
  const { progress, size } = props;
  const strokeWidth = 2;
  const r = (size - strokeWidth) / 2;
  const start = strokeWidth / 2 + r;
  const perimeter = 2 * Math.PI * r;

  if (progress === 0) return null;
  if (progress === 1)
    return (
      <div
        className={styles.progressCompleted}
        style={{
          width: size + strokeWidth,
        }}
      >
        <FiCheck size={size / 1.4} />
      </div>
    );

  return (
    <svg
      className={styles.progressIcon}
      width={size + strokeWidth}
      height={size + strokeWidth}
      viewBox={`0 0 ${size + strokeWidth} ${size + strokeWidth}`}
    >
      <circle
        cx={start}
        cy={start}
        r={r}
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={`${progress * perimeter} ${perimeter}`}
        strokeDashoffset={0}
        strokeLinecap="round"
      />
    </svg>
  );
};

ProgressIcon.defaultProps = {
  size: 40,
};

const Lectures = (props: Props) => {
  const { data } = props;
  const totalDuration = data.reduce((acc, cur) => acc + cur.duration, 0);

  const durationToString = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const minutesString = minutes > 0 ? `${minutes} min, ` : "";
    const secondsString = seconds > 0 ? `${seconds} sec` : "";
    return `${minutesString}${secondsString}`;
  };

  return (
    <div className={styles.Lectures}>
      <div className={styles.heading}>
        <div className={styles.headingText}>
          <span>Course </span>Lectures
        </div>
        <div className={styles.headingDuration}>
          <div className={styles.headingDurationIcon}>
            <FiClock color="#f7542e" />
          </div>
          <div className={styles.headingDurationText}>
            {durationToString(totalDuration)}
          </div>
        </div>
      </div>
      <div className={styles.lecturesContainer}>
        {data.map((lecture, index) => (
          <div
            className={classNames(styles.lecture, {
              [styles.lectureActive]:
                lecture.progress < 1 && lecture.progress > 0,
              [styles.lectureCompleted]: lecture.progress === 1,
              [styles.lectureNotStarted]: lecture.progress === 0,
            })}
            key={index}
          >
            <div className={styles.lectureNumberTitleDuration}>
              <div className={styles.lectureNumber}>{index + 1}</div>
              <div className={styles.lectureTitleDuration}>
                <div className={styles.lectureTitle}>{lecture.title}</div>
                <div className={styles.lectureDuration}>
                  <div className={styles.lectureDurationIcon}>
                    <FiClock size={12} />
                  </div>
                  <div className={styles.lectureDurationText}>
                    {durationToString(lecture.duration)}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.lectureProgress}>
              <ProgressIcon progress={lecture.progress} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
