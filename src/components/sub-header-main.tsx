import { Switch } from "@/components/ui/switch";

export default function SelectButton() {
  return (
    <div
      className="
     text-white  rounded-md shadow-md"
    >
      <div className="flex justify-center mx-auto">
        <Switch />
      </div>

      <div className="h-5"></div>
    </div>
  );
}
