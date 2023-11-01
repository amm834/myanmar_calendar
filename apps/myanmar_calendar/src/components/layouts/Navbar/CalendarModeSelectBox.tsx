import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/selectBoxes/Select";
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
  const enterMobileMode = useSelector((state: RootState) => state.systemState.enterMobileMode);
  const calendarMode = useSelector((state: RootState) => state.calendarState.calendarMode);

  const selectHandler = useCallback(
    (value: CALENDAR_MODE_ENUM) => {
      dispatch(setCalendarMode(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (enterMobileMode) selectHandler(CALENDAR_MODE_ENUM.YEAR);
  }, [enterMobileMode, selectHandler]);

  if (enterMobileMode) return <></>;
  return (
    <Select
      value={calendarMode}
      onValueChange={selectHandler}>
      <SelectTrigger className="h-10 rounded-md w-fit px-4">
        <span className="flex items-center gap-3 -ml-[0.35rem] -mr-[0.6rem]">
          <FaCalendarAlt className="text-cgray-400" />
          <span className="capitalize text-[0.95rem] font-medium  text-cgray-600">{CALENDAR_MODE[calendarMode]}</span>
          <BiCaretDown className="text-cgray-500" />
        </span>
      </SelectTrigger>
      <SelectContent
        className="w-[12rem]"
        align="end">
        {Object.keys(CALENDAR_MODE).map((key) => (
          <SelectItem
            value={key}
            key={key}>
            <span className="w-[10rem] flex items-center justify-between">
              <span className="capitalize">{CALENDAR_MODE[key]}</span>
              <span className="capitalize ml-auto text-cgray-500 text-[0.8rem]">{key}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CalendarModeSelectBox;
