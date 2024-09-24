import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import { ItemCounter } from "./ItemCounter";
import { IconWrapper } from "./IconWrapper";
const Menu_list = () => {
  return (
    <Listbox
      aria-label="User Menu"
      style={{ maxWidth: "250px", margin: "auto" }}
      // onAction={(key) => alert(key)}
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: "px-3 first:rounded-t-medium dark:text-white last:rounded-b-medium rounded-none gap-3 h-12 dark:hover:text-red-500 hover:bg-default-100/80 dark:hover:text-red-500"

      }}
    >
      <ListboxItem
        key="issues"
        endContent={<ItemCounter number={13} />}
        startContent={
          <IconWrapper className="bg-black text-success">
            <ChevronRight className="text-lg " />
          </IconWrapper>
        }
      >
        Issues
      </ListboxItem>
    </Listbox>
  );
};

export default Menu_list;
