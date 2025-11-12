import IDcard from "@/components/id-card";
import Modal from "@/components/modal";
import { fetchFromAPI } from "@/utils/fetcher";
import { MyProfile } from "@/app/me/page";

/* 목데이터 */
import { mockMyProfile } from "@/mock/myProfile";

type Params = Promise<{ id: number }>;

export default async function UserProFilePage({ params }: { params: Params }) {
  const { id } = await params;
  const apiUrl = `/users/${id}`;
  const res = (await fetchFromAPI(apiUrl)).data as MyProfile;
  return (
    <Modal>
      <IDcard data={res} />
    </Modal>
  );
}
