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

import axios from "axios";
import config from "config/config";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";

const LokerPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [lockerList, setLockerList] = useState([]);
  const [selectedLocker, setSelectedLocker] = useState({
    id: "8",
    name: "8",
    status: "available",
  });
  const [isAlreadyBorrow, setIsAlreadyBorrow] = useState(false);

  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    return () => {
      axios
        .get(`${config.SERVER_ADDR}/locker/`)
        .then(function (response) {
          const res = response.data.data.map((el) => {
            return {
              id: el._id,
              name: el.number,
              status: el.isUsed == false ? "available" : "used",
            };
          });

          res.sort(function (x, y) {
            if (x.name > y.name) {
              return 1;
            } else if (x.name == y.name) {
              return 0;
            } else {
              return -1;
            }
          });

          setLockerList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);

  const onClick = (loker) => {
    console.log(loker.id);
    if (!isOpen) {
      setSelectedLocker(loker);
    }
    onOpen();
  };

  const onSubmit = () => {
    axios
      .post(
        `${config.SERVER_ADDR}/locker/use/${selectedLocker.name}`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.get("token")}` },
        }
      )
      .then(() => {
        router.push("/loker/me");
      });

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
            {lockerList.map((item) => (
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
            {!cookies.get("token") ? (
              <p>Login terlebih dahulu untuk meminjam loker</p>
            ) : selectedLocker.status == "available" ? (
              <p>
                Klik tombol pinjam untuk menggunakan loker nomor{" "}
                {selectedLocker.name}
              </p>
            ) : (
              <p>
                Loker nomor {selectedLocker.name} telah digunakan, silahkan
                gunakan loker yang kosong
              </p>
            )}
          </ModalBody>

          <ModalFooter>
            {selectedLocker.status == "available" && cookies.get("token") && (
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
