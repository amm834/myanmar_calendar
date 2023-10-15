import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { CalendarLanguageSelectBox } from "./LanguageSelectBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import LogoLong from "@/components/ui/logos/LogoLong";
import SidebarToggleBtn from "@/components/ui/buttons/SidebarToggleBtn";
import { BsArrowLeftShort } from "react-icons/bs";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { setSidebarOpenState } from "@/store/systemState";
import useWindowSize from "@/hooks/useWindowSize";
import { CalendarEventList, PreferanceList } from "./CheckboxSection";

function Sidebar() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: RootState) => state.systemState.sidebarOpen);
  // const { windowWidth } = useWindowSize();

  const sidebarRef = useOnClickOutside(() => {
    if (window.innerWidth >= 1280 || !sidebarOpen) return;
    dispatch(setSidebarOpenState(false));
  });

  return (
    // <section className={`flex-shrink-0 __scrollbar-sm py-3 transition-all duration-300 flex justify-center flex-row-reverse overflow-hidden absolute ${sidebarOpen ? "w-sidebar-w" : "w-0"}`}>
    <section
      ref={sidebarRef}
      className={cn(
        "absolute h-[100vh] border-r border-gray-300 top-0 z-[1] shadow-lg xl:shadow-none xl:static xl:h-[calc(100vh-theme(spacing.nav-h))] xl:border-none flex-shrink-0 transition-all duration-300 flex flex-col items-center overflow-hidden bg-white",
        sidebarOpen ? "w-sidebar-w" : "w-0"
      )}>
      <div className="xl:hidden h-nav-h w-[16rem] flex justify-between items-center flex-shrink-0 pl-1">
        <LogoLong />
        <SidebarToggleBtn>
          <BsArrowLeftShort size={30} />
        </SidebarToggleBtn>
      </div>
      <div className="space-y-7 w-[calc(theme(spacing.sidebar-w)-2.5rem)] flex-shrink-0 py-3 pt-4 h-full  __scrollbar-sm">
        <div className="">
          <p className="text-[0.8rem] font-semibold text-gray-600 mb-[0.4rem]">CALENDAR LANGUAGE</p>
          <CalendarLanguageSelectBox />
          {/* => SystemLanguageSelectBox */}
          {/* => DateJumper */}
          {/* => EthnicEventsToggles */}
        </div>
        <PreferanceList />
        {/* <CalendarEventList /> */}
      </div>
    </section>
  );
}

export default Sidebar;
