import { Flex } from "@chakra-ui/react";

const LokerCard = ({ loker, onClick }) => {
  return (
    <Flex
      onClick={() => onClick(loker)}
      bg={`${loker.status == "available" ? "secondary.500" : "tomato"}`}
      height="100px"
      rounded={"md"}
      justifyContent={"center"}
      align={"center"}
      flexDir={"column"}
      className={"hover:scale-110 cursor-pointer transition-all"}
    >
      <h1 className="text-white font-semibold text-3xl">{loker.name}</h1>
      <p className="text-white font-heading">{loker.status}</p>
    </Flex>
  );
};

export default LokerCard;
