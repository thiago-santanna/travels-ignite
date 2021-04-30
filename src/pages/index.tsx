import { Flex, Heading, Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Caracteristicas from "../components/Caracteristicas";
import Header from "../components/Header";
import Slider from "../components/Slider";

interface HomeProps {
  continents:{
    slug: string;
    title: string;
    summary: string;
    image: string;
  }[]
}

export default function Home({ continents }: HomeProps) {
  return (
    <Flex direction="column">
    <Head>
      <title>WorldTrip - Home</title>
          <meta property="og:image" content="/ogimage.png" />
          <meta property="og:image:secure_url" content="/ogimage.png" />
          <meta name="twitter:image" content="/ogimage.png" />
          <meta name="twitter:image:src" content="/ogimage.png" />
          <meta property="og:title" content="WorldTrip" />
          <meta name="twitter:title" content="WorldTrip" />
    </Head>

    <Header />
    <Banner />
    <Caracteristicas />

    <Box w={["60px","90px"]} mx="auto" h="2px" bg="gray.700" my={["9","20"]} />
    

    <Heading
      textAlign="center"
      fontWeight="500"
      mb={["5","14"]}
      fontSize={["lg",
      "3xl",
      "4xl"]}
    >
    Vamos nessa?<br/>
    Então escolha seu continente
    </Heading>
    
    <Slider continents={continents} />
  </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const continentsList = [
    {
      slug: "Europa",
      title: "Europa",
      summary: "O continente mais antigo",
      image: "/continent-slid.png",
    },
    {
      slug: "Europa2",
      title: "Europa2",
      summary: "O continente mais antigo",
      image: "/continent-slid.png",
    },
    {
      slug: "Europa3",
      title: "Europa3",
      summary: "O continente mais antigo",
      image: "/continent-slid.png",
    },
    {
      slug: "Europa4",
      title: "Europa4",
      summary: "O continente mais antigo",
      image: "/continent-slid.png",
    },
    {
      slug: "Europa5",
      title: "Europa5",
      summary: "O continente mais antigo",
      image: "/continent-slid.png",
    }                
  ]

  const continents = continentsList.map(continent => {
    return {
      slug: continent.slug,
      title: continent.title,
      summary: continent.summary,
      image: continent.image
    }
  })

  return {
    props: {
      continents
    }
  }
}
