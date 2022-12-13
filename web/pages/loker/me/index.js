import { Button, HStack, Switch, Text } from "@chakra-ui/react";
import axios from "axios";
import config from "config/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const LokerMePage = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  const [locker, setLocker] = useState({
    number: 0,
    isOpen: false,
  });

  useEffect(() => {
    if (!cookies.get("token")) {
      router.push("/login");
    }

    axios
      .get(`${config.SERVER_ADDR}/locker/me`, {
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      })
      .then((res) => {
        setLocker(res.data.data);
      })
      .catch(() => {
        router.push("/loker");
      });

    return () => {};
  }, []);

  const onEnd = () => {
    axios
      .post(
        `${config.SERVER_ADDR}/locker/end`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.get("token")}` },
        }
      )
      .then(() => {
        router.push("/loker");
      });
  };

  const onToggle = async () => {
    console.log("hi");
    setLoading(true);
    await axios
      .post(
        `${config.SERVER_ADDR}/locker/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.get("token")}` },
        }
      )
      .then(() => {
        const temp = locker;
        temp.isOpen = !locker.isOpen;
        setLocker(temp);
      });
    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col m-10">
        <div className="w-[80vw] p-6 shadow-lg border-slate-500 border-solid rounded-md">
          <Text className="font-bold text-xl font-body mb-5 text-secondary-500">
            Loker yang sedang dipinjam
          </Text>

          <Text className="font-semibold text-md font-body mb-5">
            Nomor loker: {locker.number}
          </Text>
          <HStack className="mb-5">
            <Text className="font-semibold text-md font-body ">
              Buka/Tutup loker:
            </Text>
            <Switch
              colorScheme="teal"
              size="lg"
              isChecked={locker.isOpen}
              isDisabled={loading}
              onChange={onToggle}
            />
          </HStack>

          <HStack className="mb-5">
            <Text className="font-semibold text-md font-body">
              Sudahi peminjaman loker:
            </Text>
            <Button colorScheme="red" size="md" onClick={onEnd}>
              End
            </Button>
          </HStack>
        </div>
      </div>
    </>
  );
};

export default LokerMePage;
