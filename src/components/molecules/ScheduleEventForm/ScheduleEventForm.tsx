import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import { Event } from "../../../domain";
import styles from "./styles.module.css";

type SceduleEventFormProps = {
  event: Event;
  onSubmit: () => void;
  onCancel: () => void;
};

const SceduleEventForm: FC<SceduleEventFormProps> = ({
  event,
  onSubmit,
  onCancel
}) => {
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const handleChange = (newValue: any) => {
    setScheduleDate(newValue);
  };

  const {
    start: startDate,
    end: endDate,
    summary: title,
    description,
    location
  } = event;

  const dateFormat = "LLL d hh:mm b";

  const range = `${format(new Date(startDate), dateFormat)} - ${format(
    new Date(endDate),
    dateFormat
  )}`;

  return (
    <form>
      <h2>{title}</h2>
      <p>📍 {location}</p>
      <p>📆 {range}</p>
      <p>
        🔗{" "}
        <a href={description} target="_blank" rel="noreferrer">
          Подробнее о событии тут
        </a>
      </p>
      <div className={styles["date-input-container"]}>
        <p>Notify at:</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label=""
            value={scheduleDate}
            onChange={handleChange}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles["button-container"]}>
        <Button variant="contained" size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={onSubmit}
        >
          Schedule
        </Button>
      </div>
    </form>
  );
};

export default SceduleEventForm;