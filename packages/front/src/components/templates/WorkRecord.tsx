import dayjs from "dayjs";
import { Stats, Calendar, CalendarProps } from "../organisms";

export type Props = {
  isWoring: boolean;
  onStartWork: () => void;
  onEndWork: () => void;
} & CalendarProps;

export const WorkRecord = ({
  isWoring,
  records,
  selectedMonth,
  onChangeSelectedMonth,
  onStartWork,
  onEndWork,
}: Props) => {
  const workHours =
    Math.round(
      (records.reduce((workHours, record) => {
        if (!record.endAt) return workHours;

        return workHours + dayjs(record.endAt).diff(record.startAt, "minute");
      }, 0) /
        60) *
        10
    ) / 10;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center text-4xl font-medium w-full max-w-[1400px] min-w-[1200px]">
        <div className="flex flex-row justify-between w-full">
          <div className="">作業時間記録</div>
          {isWoring ? (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-xl font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-500"
              onClick={onEndWork}
            >
              稼働終了
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-xl font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-500"
              onClick={onStartWork}
            >
              稼働開始
            </button>
          )}
        </div>

        <Stats workHours={workHours} />
        <Calendar
          records={records}
          selectedMonth={selectedMonth}
          onChangeSelectedMonth={onChangeSelectedMonth}
        />
      </div>
    </div>
  );
};
