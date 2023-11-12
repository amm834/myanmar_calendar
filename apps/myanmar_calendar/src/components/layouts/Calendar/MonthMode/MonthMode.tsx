import { RootState } from "@/store";
import { WEEK_DAYS } from "@/utils/constants";
import { getLocalTime } from "@/utils/helpers";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MonthCell from "./MonthCell";
import { cn } from "@/lib/utils";

function MonthMode() {
  const calendarState = useSelector((state: RootState) => state.calendarState);
  const { activeDate } = calendarState;
  let activeDateObj = new Date(activeDate);

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(getLocalTime(activeDateObj))),
    end: endOfWeek(endOfMonth(getLocalTime(activeDateObj))),
  });

  // useDayEndInterval(() => console.log("day end"));

  return (
    <div aria-label="Calendar month view" className="h-full">
      <div className="grid grid-cols-7 sticky top-0 h-[2.25rem] border-gray-200 bg-gray-0">
        {Object.values(WEEK_DAYS).map((weekday) => (
          <div
            key={weekday.short}
            className={cn(
              "flex justify-center items-stretch border-r border-gray-200 h-full capitalize font-medium text-[0.85rem] px-2 py-[0.35rem] pb-[0.25rem]",
              weekday.short === "sun" || weekday.short === "sat"
                ? "text-red-500"
                : "text-gray-450",
            )}
          >
            <span className=" flex justify-center items-center rounded-md bg-gray-100 w-full h-full">
              {weekday.short}
            </span>
          </div>
        ))}
      </div>
      {/* min-h-[41rem] */}
      {/* grid-rows-[repeat(auto-fill,minmax(1fr,auto))] */}
      <div className="w-full h-[calc(100%-2.25rem)]  grid grid-cols-[repeat(7,minmax(auto,1fr))] grid-flow-row auto-rows-[1fr]">
        {days.map((day, dayIdx) => (
          <MonthCell
            key={day.toString()}
            day={day}
            calendarState={calendarState}
          />
        ))}
      </div>
    </div>
  );
}

export default MonthMode;
