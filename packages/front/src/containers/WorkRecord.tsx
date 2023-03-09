import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import dayjs from "dayjs";
import { WorkRecord as Component, Props } from "../components/templates";
import { USER } from "../graphql/user";
import {
  START_WORK,
  END_WORK,
  UPDATE_WORK,
  DELETE_WORK,
} from "../graphql/workRecord";

export const WorkRecord = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const { data: userResponse, refetch: refetchUser } = useQuery(USER);
  const [startWorkMutation] = useMutation(START_WORK);
  const [endWorkMutation] = useMutation(END_WORK);
  const [createWorkRecordMutation] = useMutation(START_WORK);
  const [updateWorkRecordMutation] = useMutation(UPDATE_WORK);
  const [deleteWorkRecordMutation] = useMutation(DELETE_WORK);

  if (!userResponse || !userResponse.user) return null;

  const user = userResponse.user;
  const workRecordList = userResponse.user.workRecords;

  const onStartWork = async () => {
    await startWorkMutation({
      variables: {
        input: { startAt: new Date().toISOString() },
      },
    });

    refetchUser();
  };

  const onEndWork = async () => {
    const workingRecord = workRecordList.find((record) => !record.endAt);

    if (!workingRecord) throw new Error("workRecord not found");

    await endWorkMutation({
      variables: {
        input: {
          id: workingRecord.id,
          endAt: new Date().toISOString(),
        },
      },
    });

    refetchUser();
  };

  const onUpdateWorkRecords = async (
    rows: {
      id?: number;
      start: string;
      end: string;
      memo: string;
    }[],
    date: Date
  ) => {
    const deletedRecord = workRecordList.filter(
      (record) =>
        dayjs(record.startAt).isSame(date, "date") &&
        rows.every((row) => row.id !== record.id)
    );

    await Promise.all(
      rows.map((row) => {
        const startDateTimeString = `${dayjs(date).format("YYYY-MM-DD")} ${
          row.start
        }`;
        const endDateTimeString = `${dayjs(date).format("YYYY-MM-DD")} ${
          row.end
        }`;
        const endAtWithCrossTheDay = endDateTimeString
          ? dayjs(endDateTimeString).isBefore(startDateTimeString)
            ? dayjs(endDateTimeString).add(1, "day").toISOString()
            : dayjs(endDateTimeString).toISOString()
          : null;

        if (row.id) {
          return updateWorkRecordMutation({
            variables: {
              input: {
                id: row.id,
                startAt: startDateTimeString,
                endAt: endAtWithCrossTheDay,
                memo: row.memo,
              },
            },
          });
        } else {
          return createWorkRecordMutation({
            variables: {
              input: {
                startAt: startDateTimeString,
                endAt: endAtWithCrossTheDay,
                memo: row.memo,
              },
            },
          });
        }
      })
    );

    await Promise.all(
      deletedRecord.map((record) =>
        deleteWorkRecordMutation({
          variables: { deleteWorkRecordId: record.id },
        })
      )
    );

    refetchUser();
  };

  const onOutputCSV = () => {
    const csvString = workRecordList.reduce(
      (_csvString, workRecord) =>
        `${_csvString}"${dayjs(workRecord.startAt).format(
          "MM-DD HH:mm"
        )}","${dayjs(workRecord.endAt).format("MM-DD HH:mm")}"\n`,
      "開始時刻,終了時刻\n"
    );
    const blob = new Blob([csvString], { type: "text/csv" }); //配列に上記の文字列(str)を設定
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${dayjs(selectedMonth).format(
      "YYYY年M月稼働記録"
    )}_${user.name.replaceAll(" ", "")}.csv`;
    link.click();
  };

  const props: Props = {
    selectedMonth,
    plannedWorkTime: user.plannedWorkTime,
    records: user.workRecords,
    isWoring: userResponse.user.workRecords.some((record) => !record.endAt),
    onStartWork,
    onEndWork,
    onChangeSelectedMonth: setSelectedMonth,
    onUpdateWorkRecords,
    onOutputCSV,
  };

  return <Component {...props} />;
};
