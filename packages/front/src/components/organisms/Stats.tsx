type Props = {
  workHours: number;
};

export const Stats = ({ workHours }: Props) => {
  return (
    <div className=" bg-gray-700 rounded-xl px-10 py-10 mt-10 w-full">
      <h3 className="text-lg font-semibold leading-6 text-title">今月の状況</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            合計稼働時間
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {workHours}時間
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            目標稼働時間
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            60時間
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            達成ペース
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            +12.6%
          </dd>
        </div>
      </dl>
    </div>
  );
};
