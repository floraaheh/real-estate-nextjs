import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import Property from "../components/Property";
import { baseUrl, estateApi } from "../services/estateApi";

export const Banner = ({
  imageURL,
  mainTitle,
  title,
  subtitle,
  description,
  descriptionLower,
  buttonName,
  buttonIsActive,
  linkName
}) => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} mt="10">
      <Box>
        <Image src={imageURL} alt="bannerImage" width="600px" height="350px" />
      </Box>
      <Box>
        <Flex flexDirection={"column"} gap={"10px"} p={"5"}>
          <Text size={"sm"} fontWeight={"bold"}>
            {mainTitle}
          </Text>
          <Heading as="h3" size={"lg"}>
            {title} <br /> {subtitle}
          </Heading>
          <Text size={"sm"}>
            {description} <br />
            {descriptionLower}
          </Text>
          <Button colorScheme={buttonIsActive ? "linkedin" : "gray"} size="lg" fontSize="lg">
            <Link href={linkName}><a>{buttonName}</a></Link>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default function Home({ forRent, forSale }) {
  return (
    <>
      {}

      <Flex flexWrap="wrap" alignItems={"center"} justifyContent={"center"} gap={"20px"} my="20">
        {
          forRent.map(item => {
            return <Property key={item.id} item={item} />
          })
        }
      </Flex>

      {}
      <Flex flexWrap="wrap" alignItems={"center"} justifyContent={"center"} gap={"20px"} my="20">
        {
          forSale.map(item => {
            return <Property key={item.id} item={item} />
          })
        }
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const forRent = await estateApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
  const forSale = await estateApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);

  return {
    props: {
      forRent: forRent.hits,
      forSale: forSale.hits
    }
  }

}
