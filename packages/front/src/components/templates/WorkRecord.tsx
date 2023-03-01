import dayjs from "dayjs";
import { Stats, Calendar, CalendarProps } from "../organisms";

export type Props = {
  isWoring: boolean;
  onStartWork: () => void;
  onEndWork: () => void;
  onUpdateWorkRecords: (
    rows: {
      id?: number;
      start: string;
      end: string;
      memo: string;
    }[],
    date: Date
  ) => Promise<void>;
} & CalendarProps;

export const WorkRecord = ({
  isWoring,
  records,
  selectedMonth,
  onChangeSelectedMonth,
  onStartWork,
  onEndWork,
  onUpdateWorkRecords,
}: Props) => {
  const workHours =
    Math.round(
      (records.reduce((workHours, record) => {
        if (!record.endAt) return workHours;

        const endAtWithCrossTheDay = dayjs(record.endAt).isBefore(
          record.startAt
        )
          ? dayjs(record.endAt).add(1, "day")
          : dayjs(record.endAt);

        return (
          workHours +
          Math.abs(dayjs(endAtWithCrossTheDay).diff(record.startAt, "minute"))
        );
      }, 0) /
        60) *
        100
    ) / 100;

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
          onUpdateWorkRecords={onUpdateWorkRecords}
        />
      </div>
    </div>
  );
};
