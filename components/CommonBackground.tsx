import Head from "next/head";
import {
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  HamburgerIcon,
  QuestionOutlineIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import SpreadInfo from "./SpreadInfo";
import SpreadList from "./SpreadList";
import useWindowHeight from "../hooks/useWindowHeight";

const CommonBackground = ({
  name,
  guide,
  description,
  children,
  onReload,
}: {
  name: string;
  guide: string;
  description: string;
  children: ReactNode;
  onReload: () => void;
}) => {
  const {
    isOpen: isDialogOpen,
    onOpen: onDialogOpen,
    onClose: onDialogClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const windowHeight = useWindowHeight() - 1;

  useEffect(() => {
    onReload();
  }, [])

  return (
    <>
      <Head>
        <title>占卜</title>
        <link rel="icon" href="./hexagram-1.svg" style={{ color: "red" }} />
      </Head>

      <Flex minHeight={windowHeight} direction={"column"}>
        <Flex justify="space-between" px={5}>
          <Link href="/select">
            <IconButton
              aria-label="back"
              colorScheme="teal"
              variant="ghost"
              size="lg"
              icon={<ArrowBackIcon />}
            />
          </Link>
          <HStack>
            <IconButton
              aria-label="reload"
              colorScheme="teal"
              variant="ghost"
              size="lg"
              icon={<RepeatIcon />}
              onClick={onReload}
            />
            <Text fontSize="xl">{name}</Text>
            <IconButton
              aria-label="back"
              colorScheme="teal"
              variant="ghost"
              size="lg"
              icon={<QuestionOutlineIcon />}
              onClick={onDialogOpen}
            />
          </HStack>
          <IconButton
            aria-label="back"
            colorScheme="teal"
            variant="ghost"
            size="lg"
            icon={<HamburgerIcon />}
            onClick={onDrawerOpen}
          />
        </Flex>

        <Box flexGrow={1}>{children}</Box>
      </Flex>

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>选择牌阵</DrawerHeader>
          <DrawerBody p={0}>
            <SpreadList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <SpreadInfo
        name={name}
        guide={guide}
        description={description}
        isOpen={isDialogOpen}
        onClose={onDialogClose}
        link=""
      />
    </>
  );
};

export default CommonBackground;
