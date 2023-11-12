import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectBoxes/Select";
import { RootState } from "@/store";
import { setCalendarMode } from "@/store/calendarState";
import { CALENDAR_MODE_ENUM } from "@/type-models/calendarState.type";
import { CALENDAR_MODE, MIN_WIDTHS } from "@/utils/constants";
import React, { useCallback, useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function CalendarModeSelectBox() {
  const dispatch = useDispatch();
  const enterMobileMode = useSelector(
    (state: RootState) => state.systemState.enterMobileMode,
  );
  const calendarMode = useSelector(
    (state: RootState) => state.calendarState.calendarMode,
  );

  const selectHandler = useCallback(
    (value: CALENDAR_MODE_ENUM) => {
      dispatch(setCalendarMode(value));
    },
    [dispatch],
  );

  useEffect(() => {
    if (enterMobileMode) selectHandler(CALENDAR_MODE_ENUM.YEAR);
  }, [enterMobileMode, selectHandler]);

  if (enterMobileMode) return <></>;
  return (
    <Select value={calendarMode} onValueChange={selectHandler}>
      <SelectTrigger className="h-input-md rounded-md w-fit px-4">
        <span className="flex items-center gap-3 -ml-[0.35rem] -mr-[0.6rem]">
          <FaCalendarAlt className="text-gray-400" />
          <span className="capitalize text-[0.95rem] font-medium  text-gray-600">
            {CALENDAR_MODE[calendarMode]}
          </span>
          <BiCaretDown className="text-gray-500" />
        </span>
      </SelectTrigger>
      <SelectContent
        className="w-[14rem] px-0 py-[0.25rem] rounded-sm"
        align="end"
      >
        {Object.keys(CALENDAR_MODE).map((key) => (
          <SelectItem
            value={key}
            key={key}
            className="px-3 rounded-none h-[2.5rem] hover:bg-gray-50 data-[state=checked]:bg-gray-200/50"
          >
            <span className="w-[12rem] flex items-center justify-between">
              <span className="capitalize">{CALENDAR_MODE[key]}</span>
              <span className="capitalize ml-auto text-gray-500/90 text-[0.8rem]">
                {key}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CalendarModeSelectBox;
