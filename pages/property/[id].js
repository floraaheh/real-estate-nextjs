import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseUrl, estateApi } from "../../services/estateApi";
import Slider from "react-slick";
import Image from 'next/image';
import { Box, Text, Heading, Flex, Avatar } from '@chakra-ui/react';
import { HiBadgeCheck } from 'react-icons/hi'
import { Settings } from '../../utils/settings';
import { FaBath, FaBed } from 'react-icons/fa';
import { RiApps2Fill } from 'react-icons/ri';
import millify from 'millify';
import parse from 'html-react-parser';

const Detail = ({ propertyDetails }) => {
    console.log(propertyDetails);
    const { photos, title, isVerified, rentFrequency, price, agency, description, amenities, rooms, bath, area, type, furnishingStatus, purpose } = propertyDetails;

    return (
        <Box my="2" px="16">
            <Slider {...Settings}>
                {photos.map((photo, index) => (
                    <Box key={index}>
                        <Image src={photo.url} alt="bannerImage" width="690px" height="400px" objectFit='cover' />
                    </Box>
                ))}
            </Slider>


            <Flex mt="8" gap="0 20px" flexDirection="column">
                <Flex justifyContent="space-between" alignItems="center">
                    <Flex flexDirection="column">
                        <Flex>
                            {}
                            <Text fontSize="lg" fontWeight="bold">Rs {price}{rentFrequency ? `` : ""}</Text>
                        </Flex>
                        <Flex alignItems="center" fontSize="16px" color="black.500" gap="0 15px">
                            {rooms} <FaBed /> | {bath} <FaBath /> | {millify(area)} sqft <RiApps2Fill />
                        </Flex>
                    </Flex>
                    
                </Flex>

                <Heading fontSize="lg" fontWeight="bold" my="2">{title}</Heading>
            </Flex>


            <Flex flexDirection="column">
                <Text my="2" textAlign="justify" lineHeight="2">
                    {parse(description)}
                </Text>

                
                    </Flex>
                   
              

    
           
        </Box>
    );
};


export async function getServerSideProps({ params: { id } }) {
    const data = await estateApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return {
        props: {
            propertyDetails: data,
        },
    };
}



export default Detail;