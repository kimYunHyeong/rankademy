"use server";

import { fetchFromAPI } from "@/utils/fetcher";
import FormSection from "./_components/formSection";
import { updateProfile } from "./_components/update-profile";

/* 목데이터 */
import { mockMyProfile } from "@/mock/myProfile";

export default async function EditMyProfile() {
  const apiUrl = "/me";
  const res = await fetchFromAPI(apiUrl);

  return <FormSection data={res} updateProfile={updateProfile} />;
}
