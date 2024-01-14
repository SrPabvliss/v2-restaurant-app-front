import React from "react";


interface ListboxWrapperProps {
    children: React.ReactNode;
  }
export const ListboxWrapper: React.FC<ListboxWrapperProps> = ({children}) => (
  <div className="w-full max-w-[260px] px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

