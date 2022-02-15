import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents, selectLoading } from "../../../store/events/selectors";
import { getEventsThunk } from "../../../store/events/thunks";
import { getUserThunk } from "../../../store/user/thunks";
import { Event } from "../../../domain";
import EventsCalendar from "../../organisms/EventsCalendar";
import YearSelect from "../../atoms/YearSelect";
import styles from "./styles.module.css";
import { setLoading } from "../../../store/events/eventsSlice";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getUserThunk());
    dispatch(getEventsThunk(year));
  }, [dispatch, year]);

  const years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];

  const events: Event[] = useSelector(selectEvents);
  const isLoading: boolean = useSelector(selectLoading);

  return (
    <div className={styles["calendar-container"]}>
      <div className={styles["year-select-container"]}>
        <YearSelect
          options={years}
          value={year}
          setValue={setYear}
          label="Current year"
        />
      </div>
      <EventsCalendar
        isLoading={isLoading}
        year={year.toString()}
        events={events}
      />
    </div>
  );
};
export default Dashboard;