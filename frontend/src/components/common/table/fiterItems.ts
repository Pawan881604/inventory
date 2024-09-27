import React from "react";
import { vendr_list as Vendor } from "@/types/Vendor_type";

// Interface for the hook props
interface Props {
  users: Vendor[];
  hasSearchFilter: boolean;
  filterValue: string;
  statusFilter: string | Set<string>;
  statusOptions: string[];
}

// Custom hook for filtering users
const useFilteredItems = ({
  users,
  hasSearchFilter,
  filterValue,
  statusFilter,
  statusOptions,
}: Props) => {
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    // Apply search filter if enabled
    if (hasSearchFilter && filterValue) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Handle status filter
    if (statusFilter !== "all") {
      const statusFilterArray = 
        typeof statusFilter === "string" ? [statusFilter] : Array.from(statusFilter);

      // Apply status filter if it's not 'all' and the selection differs from available options
      if (statusFilterArray.length !== statusOptions.length) {
        filteredUsers = filteredUsers.filter((user) =>
          statusFilterArray.includes(user._id)
        );
      }
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, hasSearchFilter, statusOptions]);

  return filteredItems;
};

export default useFilteredItems;
