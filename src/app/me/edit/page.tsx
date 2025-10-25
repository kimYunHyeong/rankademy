import { serverFetchFromAPI } from "@/utils/fetcher.server";
import FormSection from "./_components/formSection";

/* 목데이터 */
import { mockMyProfile } from "@/mock/myProfile";

export default async function EditMyProfile() {
  const apiUrl = "/me";
  /*  const res = await serverFetchFromAPI(apiUrl); */
  const data = mockMyProfile;

  return <FormSection data={data} />;
}
