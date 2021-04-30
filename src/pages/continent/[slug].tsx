import { Flex } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { RichText } from 'prismic-dom';
import Cities from "../../components/Cities";
import Content from "../../components/Content";
import ContinentBanner from "../../components/ContinentBanner";
import Header from "../../components/Header";
import { getPrismicClient } from "../../services/prismic";
import Prismic from '@prismicio/client';
import { useRouter } from "next/dist/client/router";
import Loading from "../../components/Loading";

export interface ContinentProps {
  continent: {
    slug: string;
    title: string;
    description: string;
    banner_image: string;
    countries: number;
    languages: number;
    cities: number;
    cities_list: string;
    cities100: {
      city: string;
      country: string;
      thumbnail: string;
      flag: string;
    }[]
  }
}

export default function Continent({continent}: ContinentProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />
  }

  return (
    <Flex direction="column">
      <Head>
        <title>WorldTrip - {continent.title}</title>

        <meta property="og:title" content={`WorldTrip ${continent.title}`} />
        <meta property="og:description" content={continent.description} />
        <meta name="twitter:title" content={`WorldTrip ${continent.title}`} />

        <meta name="twitter:image" content={continent.banner_image} />
        <meta name="twitter:image:src" content={continent.banner_image} />
        <meta property="og:image" content={continent.banner_image} />
        <meta property="og:image:secure_url" content={continent.banner_image} />
      </Head>

      <Header />
      <ContinentBanner continent={continent} />

      <Flex direction="column" maxW="1160px" mx="auto" mb="10" px="1rem">
        <Content continent={continent} />
        <Cities continent={continent} />
      </Flex>
    </Flex>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const description = "A Europa é, por convenção, um dos seis continentes do mundo. Compreendendo a península ocidental da Eurásia, a Europa geralmente divide-se da Ásia a leste pela divisória de águas dos montes Urais, o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste"
  const continent = {
    slug:"Europa",
    title: "Europa",
    description: description,
    banner_image: "/banner-continent.png",
    countries: "50",
    languages: "60",
    cities: "27",
    cities_list: "cities_list",
    cities100: [
      {
        city: "Londres",
        country: "Reino Unido",
        thumbnail: "/londres.png",
        flag: "/reino.svg",
      },
      {
        city: "Paris",
        country: "França",
        thumbnail: "/paris.png",
        flag: "/franca.svg",
      },
      {
        city: "Roma",
        country: "Italia",
        thumbnail: "/roma.png",
        flag: "/italia.svg",
      },
      {
        city: "Praga",
        country: "Republica Tcheca",
        thumbnail: "/praga.png",
        flag: "/reptecha.svg",
      },
      {
        city: "Amsterdã",
        country: "Holanda",
        thumbnail: "/amsterda.png",
        flag: "/holanda.svg",
      }                        
    ]
  };

  return {
    props: {
      continent
    },
    revalidate: 1800,
  }
}