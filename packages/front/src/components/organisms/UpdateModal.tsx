import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { WorkRecord } from "../../generated-graphql/graphql";

type Row = {
  id?: number;
  start: string;
  end: string;
  memo: string;
};
type UpdateModalProps = {
  isOpen: boolean;
  date: Date | null;
  records: Omit<WorkRecord, "user" | "userId" | "craetedAt">[];
  onClose: () => void;
  onSave: (
    rows: {
      id?: number;
      start: string;
      end: string;
      memo: string;
    }[],
    date: Date
  ) => Promise<void>;
};
export const UpdateModal = ({
  isOpen,
  date,
  records,
  onClose,
  onSave,
}: UpdateModalProps) => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    setRows(
      records.length > 0
        ? records.map((record) => ({
            id: record.id,
            start: dayjs(record.startAt).format("HH:mm"),
            end: record.endAt ? dayjs(record.endAt).format("HH:mm") : "",
            memo: record.memo || "",
          }))
        : [{ start: "", end: "", memo: "" }]
    );
  }, [date, records]);

  const onPressSave = async () => {
    if (!date) throw new Error("date is null");

    await onSave(rows, date);

    onClose();
  };

  return (
    // FIXME: headless uiとreactの型が合わないので一旦ignore
    // @ts-ignore
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          // @ts-ignore
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              // @ts-ignore
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-700 text-title px-6 pt-5 pb-5 text-left shadow-xl transition-all w-[800px]">
                <div className="text-xl font-medium pb-6">
                  {date && dayjs(date).format("YYYY年M月D日の稼働時間")}
                </div>
                {rows.map((row, index) => (
                  <div className="flex flex-row items-center pb-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-title"
                      >
                        開始時刻
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="email"
                          className="block w-20 rounded-md bg-slate-900 shadow-sm focus:border-slate-900 focus:ring-slate-900 border-none"
                          value={row.start}
                          onChange={(e) =>
                            setRows((prev) => [
                              ...prev.slice(0, index),
                              { ...prev[index], start: e.target.value },
                              ...prev.slice(index + 1, prev.length),
                            ])
                          }
                        />
                      </div>
                    </div>
                    <div className="ml-6">
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-title"
                      >
                        終了時刻
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="email"
                          className="block w-20 rounded-md bg-slate-900 shadow-sm focus:border-slate-900 focus:ring-slate-900 border-none"
                          value={row.end}
                          onChange={(e) =>
                            setRows((prev) => [
                              ...prev.slice(0, index),
                              { ...prev[index], end: e.target.value },
                              ...prev.slice(index + 1, prev.length),
                            ])
                          }
                        />
                      </div>
                    </div>
                    <div className="ml-6 w-full">
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-title"
                      >
                        メモ
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="email"
                          className="block w-full rounded-md bg-slate-900 shadow-sm focus:border-slate-900 focus:ring-slate-900 border-none"
                          value={row.memo}
                          onChange={(e) =>
                            setRows((prev) => [
                              ...prev.slice(0, index),
                              { ...prev[index], memo: e.target.value },
                              ...prev.slice(index + 1, prev.length),
                            ])
                          }
                        />
                      </div>
                    </div>
                    <button
                      className="w-14 h-9 mt-5 ml-1 hover:bg-slate-600 flex flex-row justify-center items-center rounded-full"
                      onClick={() =>
                        setRows((prev) =>
                          prev.filter((_, prevIndex) => index !== prevIndex)
                        )
                      }
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-slate-800 px-3 py-2 text-sm font-medium leading-4 text-title shadow-sm "
                  onClick={() =>
                    setRows((prev) => [
                      ...prev,
                      { start: "", end: "", memo: "" },
                    ])
                  }
                >
                  追加
                </button>
                <div className="flex flex-row justify-end mt-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm bg-slate-600 text-slate-200"
                    onClick={onClose}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    className={`inline-flex items-center px-5 py-2.5 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm bg-green-600 text-title ml-2`}
                    onClick={onPressSave}
                  >
                    保存
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
