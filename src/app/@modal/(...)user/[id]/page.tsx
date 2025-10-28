import IDcard from "@/components/id-card";
import Modal from "@/components/modal";
import { fetchFromAPI } from "@/utils/fetcher";
import { MyProfile } from "@/app/me/page";

/* 목데이터 */
import { mockMyProfile } from "@/mock/myProfile";

type Params = Promise<{ userId: number }>;

export default async function UserProFilePage({ params }: { params: Params }) {
  const { userId } = await params;
  const apiUrl = `/users/${userId}`;
  const res = (await fetchFromAPI(apiUrl)) as MyProfile;
  return (
    <Modal>
      <IDcard data={res} />
    </Modal>
  );
}
