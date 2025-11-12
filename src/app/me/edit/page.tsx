"use server";

import { fetchFromAPI } from "@/utils/fetcher";
import FormSection from "./_components/formSection";
import { updateProfile } from "./_components/actions";

/* 목데이터 */
import { mockMyProfile } from "@/mock/myProfile";
import { MyProfile } from "../page";

export default async function EditMyProfile() {
  const apiUrl = "/me";
  const res = (await fetchFromAPI(apiUrl)).data as MyProfile;

  const riotVerifyStatus: boolean = res.summonerInfo.puuid ? true : false;

  return (
    <FormSection
      data={res}
      updateProfile={updateProfile}
      riotVerifyStatus={riotVerifyStatus}
    />
  );
}
