import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
  return <div>DashboardPage</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default DashboardPage;
