import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spacer, Input, Spinner } from "@nextui-org/react";
import { SearchIcon, XIcon } from "@primer/octicons-react";
import TokenItem from "../components/TokenItem";
import useTokenSelectionModalStore from "../store/useTokenSelectionModalStore";
import useSwapStore from "../store/useSwapStore";
import useUserStore from "../../../App/useUserStore";
import { useJettons, useJetton } from "../hooks/useTokenSelectionModal";

export default function TokenSelectionModal() {
  const { user } = useUserStore();
  const { receiveJetton, sendJetton } = useSwapStore();
  const {
    selectionJettons,
    isTokenSelectionModalOpen,
    closeTokenSelectionModal,
    isJettonsLoaded
  } = useTokenSelectionModalStore();

  const [searchText, setSearchText] = useState("");

  useJettons(user.address, isTokenSelectionModalOpen);
  useJetton(searchText, searchText.length > 20 && isTokenSelectionModalOpen);

  useEffect(() => {
    if (!isTokenSelectionModalOpen) {
      setSearchText("");
    }
  }, [isTokenSelectionModalOpen]);

  const handleSearchChange = (event) => {
    const jettonAddress = event.target.value;
    setSearchText(jettonAddress);
  };

  const handleClearButton = () => {
    setSearchText("");
  };

  const filteredJettons = selectionJettons.filter(jetton =>
    jetton.address !== sendJetton.address &&
    (!receiveJetton || jetton.address !== receiveJetton.address)
  );

  return (
    <Modal
      isOpen={isTokenSelectionModalOpen}
      isDismissable={true}
      onClose={closeTokenSelectionModal}
      size="sm"
      placement="center"
      className="bg-modal text-white rounded-3xl mx-3"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-xl">Select Token</ModalHeader>
        {isJettonsLoaded ? (
          <ModalBody>
            <Input
              variant="bordered"
              type="text"
              color="primary"
              placeholder="Paste contract address"
              value={searchText}
              onChange={handleSearchChange}
              startContent={<SearchIcon size={16} />}
              endContent={
                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  variant="light"
                  onClick={handleClearButton}
                  className="text-white"
                >
                  <XIcon size={16} />
                </Button>
              }
            />
            <div>
              {filteredJettons.length > 0 ? (
                filteredJettons.map((jetton, index) => (
                  <div key={String(index)}>
                    <TokenItem jetton={jetton} />
                    {index < filteredJettons.length - 1 && <Spacer y={2} />}
                  </div>
                ))
              ) : (
                <p className="text-center mt-5">Nothing found</p>
              )}
            </div>
          </ModalBody>
        ) : (
          <Spinner color="default" className="flex justify-center items-center mt-5" />
        )}
        <ModalFooter/>
      </ModalContent>
    </Modal>
  );
}
