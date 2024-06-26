import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import classNames from "classnames/bind";

import { basicInstance, setContext } from "@/apis/axios";
import { PAGE_PATH } from "@/constants/pagePath";
import loadingLottie from "@/public/images/login-loading.json";

import styles from "./Google.module.scss";

const cn = classNames.bind(styles);

interface ResponseType {
  id: number;
  isComplete: boolean;
  accessToken: string;
  accessTokenExpireAt: string;
  refreshToken: string;
  refreshTokenExpireAt: string;
}

interface GoogleProps {
  id: number;
  isComplete: boolean;
}

const LottiePlayer = dynamic(() => import("react-lottie-player"), { ssr: false });

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<GoogleProps>> {
  setContext(context);

  const { code } = context.query;

  try {
    const res = await basicInstance.get("/login/oauth2/code/google", {
      params: {
        code,
      },
    });

    const { id, isComplete, accessToken, refreshToken, refreshTokenExpireAt }: ResponseType =
      res.data;

    if (accessToken && refreshToken) {
      const REFRESH_TOKEN_EXPIRE_AT = new Date(refreshTokenExpireAt).toUTCString();

      const ACCESS_TOKEN = `ACCESS_TOKEN=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-age=1800`;
      const REFRESH_TOKEN = `REFRESH_TOKEN=${refreshToken}; Path=/; HttpOnly; SameSite=Strict; Secure; Expires=${REFRESH_TOKEN_EXPIRE_AT}`;

      context.res.setHeader("Set-Cookie", [ACCESS_TOKEN, REFRESH_TOKEN]);
    }

    return {
      props: { id, isComplete },
    };
  } catch (error) {
    return {
      redirect: {
        destination: PAGE_PATH.SIGN_IN,
        permanent: false,
      },
    };
  }
}

export default function Google({ id, isComplete }: GoogleProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isComplete) {
      router.push({ pathname: PAGE_PATH.PROFILE_SETUP, query: { id } }, PAGE_PATH.PROFILE_SETUP);
      return;
    }

    router.push(PAGE_PATH.DASHBOARD);
  }, [isComplete]);

  return (
    <div className={cn("container")}>
      <LottiePlayer animationData={loadingLottie} loop play className={cn("loading-lottie")} />
    </div>
  );
}
