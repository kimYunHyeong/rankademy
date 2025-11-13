import CreateGroupFormSection from "./_components/formSection";
import { createGroup, uploadImage } from "./actions";

export default function GroupCreatePage() {
  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>그룹 생성</span>
      </div>
      <div className="h-8"></div>
      <CreateGroupFormSection
        imgUrlAction={uploadImage}
        submitAction={createGroup}
      />
    </>
  );
}
