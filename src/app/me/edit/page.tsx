import { fetchFromAPI } from "@/utils/fetcher";
import FormSection from "./_components/formSection";

/* 목데이터 */
import { mockMyProfile } from "@/mock/myProfile";

export default async function EditMyProfile() {
  const apiUrl = "/me";
  /*  const res = await fetchFromAPI(apiUrl); */
  const data = mockMyProfile;

  return <FormSection data={data} />;
}
