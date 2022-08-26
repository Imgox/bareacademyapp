import React from "react";
import Head from "next/head";
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import { useIsAuth } from 'lib/isAuth';
import ChatSideBar from 'components/Chat/ChatSideBar';
// import { initializeApollo } from "lib/apolloClient";
// import { ChatsDocument, ChatsQueryResult } from 'generated/graphql';
// import axios from "axios";

function Messages() {
  // console.log(props.data.data);
  useIsAuth();
  return (
    <>
        <Head>
          <title>Baretutorials</title>
          <meta
            name="description"
            content="Tutorial site for learning web and software development"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ChatSideBar />
      </>
  );
}
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    // const { slug } = ctx.query;
    // const baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
    // const cookies = JSON.parse(ctx.req.cookies.bareacademy);
    // const { jwt, id } = cookies;
    // const token = `Bearer ${jwt}`;

    // const getChatData = async () => {
    //   try {
    //     return (await axios({
    //       method: "GET",
    //       url: `${baseUrl}/chats`,
    //       headers: {
    //         Accept: "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       data: {
    //         id,
    //       },
    //     })).data;

    //     // console.log(response.data, "I am the response going off brah")
    //   } catch (err) {
    //     console.log("fuck me finally", err);
    //   }
    // }

    
    // const data = await getChatData();
    // console.log(data)
    return {
      props: {},
    };
  }
);
export default Messages;
