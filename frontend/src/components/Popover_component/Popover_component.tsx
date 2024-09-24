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
}

const PopoverComponent: React.FC<Props> = ({ open, set_open }) => {
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
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
              <Vendor_from />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => set_open(false)}
              >
                Close
              </Button>
              <Button color="primary" onPress={() => set_open(false)}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PopoverComponent;
