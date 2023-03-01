import { useMemo } from "react";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { WorkRecord } from "@kintai/api/src/gqlTypes";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type CalendarProps = {
  selectedMonth: Date;
  onChangeSelectedMonth: (date: Date) => void;
  records: Omit<WorkRecord, "user" | "userId" | "craetedAt">[];
};
export const Calendar = ({
  records,
  selectedMonth,
  onChangeSelectedMonth,
}: CalendarProps) => {
  const daysInPreviousMonth = Array.from(
    new Array(dayjs(selectedMonth).subtract(1, "month").daysInMonth())
  ).map((_, index) =>
    dayjs(selectedMonth)
      .subtract(1, "month")
      .date(index + 1)
  );
  const daysInMonth = Array.from(
    new Array(dayjs(selectedMonth).daysInMonth())
  ).map((_, index) => dayjs(selectedMonth).date(index + 1));
  const daysInNextMonth = Array.from(
    new Array(dayjs(selectedMonth).add(1, "month").daysInMonth())
  ).map((_, index) =>
    dayjs(selectedMonth)
      .add(1, "month")
      .date(index + 1)
  );

  // カレンダーに表示する前月・翌月の日付を計算
  const displayDaysInPreviousMonth = -(daysInMonth[0].day() === 0
    ? 6
    : daysInMonth[0].day() - 1);
  const displayDaysInNextMonth = 7 - daysInMonth[daysInMonth.length - 1].day();
  const days = useMemo(
    () =>
      [
        ...(displayDaysInPreviousMonth !== 0
          ? daysInPreviousMonth.slice(displayDaysInPreviousMonth)
          : []),
        ...daysInMonth,
        ...(displayDaysInNextMonth !== 7
          ? daysInNextMonth.slice(
              0,
              7 - daysInMonth[daysInMonth.length - 1].day()
            )
          : []),
      ].map((date) => ({
        date: date.format("YYYY-MM-DD"),
        isCurrentMonth: dayjs(selectedMonth).isSame(date, "month"),
        works: records.filter((record) =>
          dayjs(record.startAt).isSame(date, "date")
        ),
        isToday: dayjs().isSame(date, "date"),
      })),
    [selectedMonth, records, dayjs]
  );

  const disabledNextMonth = dayjs(selectedMonth).isSame(dayjs(), "month");
  const previousMonth = () => {
    onChangeSelectedMonth(dayjs(selectedMonth).subtract(1, "month").toDate());
  };

  const nextMonth = () => {
    onChangeSelectedMonth(dayjs(selectedMonth).add(1, "month").toDate());
  };

  return (
    <div className="lg:flex lg:h-full lg:flex-col w-full">
      <header className="flex items-center justify-between border-b border-gray-500 pt-10 pb-6 pl-4 lg:flex-none">
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-500 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={previousMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-gray-500 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            >
              {dayjs(selectedMonth).format("YYYY年M月")}
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              disabled={disabledNextMonth}
              className={`flex items-center justify-center rounded-r-md border border-l-0 border-gray-500 bg-white py-2 pl-4 pr-3 ${
                disabledNextMonth
                  ? "text-gray-200"
                  : "text-gray-400 hover:text-gray-500 focus:relative"
              }  md:w-9 md:px-2 md:hover:bg-gray-50`}
              onClick={nextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-500 bg-gray-500 text-center text-xs font-semibold leading-6 text-title lg:flex-none">
          <div className="bg-slate-700 py-2">月</div>
          <div className="bg-slate-700 py-2">火</div>
          <div className="bg-slate-700 py-2">水</div>
          <div className="bg-slate-700 py-2">木</div>
          <div className="bg-slate-700 py-2">金</div>
          <div className="bg-slate-700 py-2">土</div>
          <div className="bg-slate-700 py-2">日</div>
        </div>
        <div className="flex bg-gray-500 text-xs leading-6 text-title lg:flex-auto">
          <div
            className={`hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-${Math.round(
              days.length / 7
            )} lg:gap-px`}
          >
            {days.map((day) => (
              <div
                key={day.date}
                className={classNames(
                  day.isCurrentMonth
                    ? "bg-slate-700"
                    : "bg-slate-800 text-gray-500",
                  "relative py-2 px-3 h-24"
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {dayjs(day.date).format("D")}
                </time>
                {day.works.length > 0 && (
                  <ol className="mt-2 text-base text-white">
                    {day.works.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <div className="flex">
                          <time
                            dateTime={event.startAt}
                            className="flex-none  group-hover:text-indigo-600 xl:block"
                          >
                            {dayjs(event.startAt).format("HH:mm")}
                          </time>
                          〜
                          <time
                            dateTime={event.startAt}
                            className="flex-none  group-hover:text-indigo-600 xl:block"
                          >
                            {event.endAt && dayjs(event.endAt).format("HH:mm")}
                          </time>
                        </div>
                      </li>
                    ))}
                    {day.works.length > 2 && (
                      <li className="text-gray-500">
                        + {day.works.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
