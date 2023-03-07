import dayjs from "dayjs";
import { Stats, Calendar, CalendarProps } from "../organisms";

export type Props = {
  isWoring: boolean;
  plannedWorkTime: number;
  onStartWork: () => void;
  onEndWork: () => void;
  onUpdateWorkRecords: (
    rows: {
      id?: number;
      start: string;
      end: string;
      memo: string;
      plannedWorkTime: number;
    }[],
    date: Date
  ) => Promise<void>;
  onOutputCSV: () => void;
} & CalendarProps;

export const WorkRecord = ({
  isWoring,
  plannedWorkTime,
  records,
  selectedMonth,
  onChangeSelectedMonth,
  onStartWork,
  onEndWork,
  onUpdateWorkRecords,
  onOutputCSV,
}: Props) => {
  const workHours =
    Math.round(
      (records.reduce((workHours, record) => {
        if (!record.endAt) return workHours;

        return workHours + dayjs(record.endAt).diff(record.startAt, "minute");
      }, 0) /
        60) *
        100
    ) / 100;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center text-4xl font-medium w-full max-w-[1400px] min-w-[1200px]">
        <div className="flex flex-row justify-between w-full">
          <div className="">作業時間記録</div>
          <div className="flex flex-row">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-xl font-medium rounded-full shadow-sm text-white bg-slate-600 hover:bg-slate-500 mr-4"
              onClick={onOutputCSV}
            >
              CSV出力
            </button>
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
        </div>

        <Stats workHours={workHours} plannedWorkTime={plannedWorkTime} />
        <Calendar
          records={records}
          selectedMonth={selectedMonth}
          onChangeSelectedMonth={onChangeSelectedMonth}
          onUpdateWorkRecords={onUpdateWorkRecords}
        />
      </div>
    </div>
  );
};
