import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";

type Props = {
  onSignOut: () => void;
};

export const Menu = ({ onSignOut }: Props) => {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:border-slate-900 focus:ring-slate-900 border-slate-900 ring-slate-900">
        <Cog6ToothIcon
          className="h-5 w-5  my-1 mx-1 rounded-full focus:border-slate-900 focus:ring-slate-900 border-slate-900 ring-slate-900"
          aria-hidden="true"
          color="white"
        />
      </Popover.Button>

      <Transition
        // @ts-ignore
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-[-60px] z-10 mt-2 flex w-60 max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-xl bg-slate-700 text-sm leading-6 shadow-lg">
            <div className="p-3">
              <div className="group relative flex rounded-lg p-3 hover:bg-slate-500">
                <div>
                  <button
                    className="font-medium text-title text-base"
                    onClick={onSignOut}
                  >
                    サインアウト
                    <span className="absolute inset-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
