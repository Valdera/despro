import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LokerCard from "@components/card/loker/LokerCard";
import { useRef, useState } from "react";

const mock = [
  {
    id: "1",
    name: "1",
    status: "used",
  },
  {
    id: "2",
    name: "2",
    status: "available",
  },
  {
    id: "3",
    name: "3",
    status: "available",
  },
  {
    id: "4",
    name: "4",
    status: "used",
  },
  {
    id: "5",
    name: "5",
    status: "available",
  },
  {
    id: "6",
    name: "6",
    status: "used",
  },
  {
    id: "7",
    name: "7",
    status: "available",
  },
  {
    id: "8",
    name: "8",
    status: "available",
  },
];

const LokerPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [loker, setLoker] = useState({
    id: "0",
    name: "0",
    status: "available",
  });

  const onClick = (loker) => {
    console.log(loker.id);
    if (!isOpen) {
      setLoker(loker);
    }
    onOpen();
  };

  const onSubmit = () => {
    onClose();
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col m-10">
        <Stack align={"center"} marginBottom={"10"}>
          <Heading fontSize={"4xl"} fontFamily={"heading"}>
            Pinjam <span className="text-primary-400">Loker</span>
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            silahkan klik loker yang available untuk dapat menggunakan loker
          </Text>
        </Stack>

        <div className="w-[80vw]">
          <SimpleGrid minChildWidth="120px" spacing="40px">
            {mock.map((item) => (
              <LokerCard key={item.id} loker={item} onClick={onClick} />
            ))}
          </SimpleGrid>
        </div>
      </div>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loker.status == "available" ? (
              <p>
                Klik tombol pinjam untuk menggunakan loker nomor {loker.name}
              </p>
            ) : (
              <p>
                Loker nomor {loker.name} telah digunakan, silahkan gunakan loker
                yang kosong
              </p>
            )}
          </ModalBody>

          <ModalFooter>
            {loker.status == "available" && (
              <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                Pinjam
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LokerPage;
