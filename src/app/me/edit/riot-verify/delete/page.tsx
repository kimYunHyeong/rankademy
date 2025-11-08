import { DeleteRiotVerify } from "../actions";
import DeleteRiotVerifyPopUp from "./_components/delete-popup";

export default function DeleteRiotVerifyPage() {
  return <DeleteRiotVerifyPopUp deleteAction={DeleteRiotVerify} />;
}
