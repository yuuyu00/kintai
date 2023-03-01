import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { WorkRecord as Component, Props } from "../components/templates";
import { USER } from "../graphql/user";
import { START_WORK, END_WORK } from "../graphql/workRecord";

export const WorkRecord = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const { data: userResponse, refetch: refetchUser } = useQuery(USER, {
    // ログイン機能を実装したら修正する
    variables: { id: 1 },
  });
  const [startWorkMutation] = useMutation(START_WORK);
  const [endWorkMutation] = useMutation(END_WORK);

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

  const props: Props = {
    selectedMonth,
    onChangeSelectedMonth: setSelectedMonth,
    records: user.workRecords,
    isWoring: userResponse.user.workRecords.some((record) => !record.endAt),
    onStartWork,
    onEndWork,
  };

  return <Component {...props} />;
};
