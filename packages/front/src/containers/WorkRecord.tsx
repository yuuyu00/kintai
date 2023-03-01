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

  const { data: userResponse, refetch: refetchUser } = useQuery(USER, {
    // ログイン機能を実装したら修正する
    variables: { id: 1 },
  });
  const [startWorkMutation] = useMutation(START_WORK);
  const [endWorkMutation] = useMutation(END_WORK);
  const [createWorkRecordMutation] = useMutation(START_WORK);
  const [updateWorkRecordMutation] = useMutation(UPDATE_WORK);
  const [deleteWorkRecordMutation] = useMutation(DELETE_WORK);

  if (!userResponse) return null;

  if (!userResponse.user) throw new Error("user not found");

  const user = userResponse.user;
  const workRecordList = userResponse.user.workRecords;

  const onStartWork = async () => {
    await startWorkMutation({
      variables: {
        input: { userId: user.id, startAt: new Date().toISOString() },
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
        if (row.id) {
          updateWorkRecordMutation({
            variables: {
              input: {
                id: row.id,
                startAt: `${dayjs(date).format("YYYY-MM-DD")} ${row.start}`,
                endAt: row.end
                  ? `${dayjs(date).format("YYYY-MM-DD")} ${row.end}`
                  : null,
                memo: row.memo,
              },
            },
          });
        } else {
          createWorkRecordMutation({
            variables: {
              input: {
                userId: user.id,
                startAt: `${dayjs(date).format("YYYY-MM-DD")} ${row.start}`,
                endAt: row.end
                  ? `${dayjs(date).format("YYYY-MM-DD")} ${row.end}`
                  : null,
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

  const props: Props = {
    selectedMonth,
    records: user.workRecords,
    isWoring: userResponse.user.workRecords.some((record) => !record.endAt),
    onStartWork,
    onEndWork,
    onChangeSelectedMonth: setSelectedMonth,
    onUpdateWorkRecords,
  };

  return <Component {...props} />;
};
