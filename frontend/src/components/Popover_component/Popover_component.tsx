"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Vendor_from from "../pages/crm/vendor/Vendor_from"; // Adjust path as necessary
import React from "react";

interface Props {
  open: boolean;
  set_open: (value: boolean) => void;
  components: React.JSX.Element; // Define the components prop
}

const PopoverComponent: React.FC<Props> = ({ open, set_open, components }) => {
  return (
    <Modal
      size={"2xl"}
      isOpen={open} // Use the 'open' prop to control modal state
      placement={"bottom-center"}
      onOpenChange={set_open} // Use the 'set_open' function for modal state changes
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {components}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PopoverComponent;
