"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";

export default function Toggle({
  groupId,
  defaultChecked = true,
  onAble,
  onDisable,
}: {
  groupId: number;
  defaultChecked?: boolean;
  onAble: (groupId: number) => Promise<void> | void;
  onDisable: (groupId: number) => Promise<void> | void;
}) {
  const [checked, setChecked] = React.useState<boolean>(defaultChecked);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleCheckedChange = async (next: boolean) => {
    if (loading) return;

    // 낙관적 업데이트
    const prev = checked;
    setChecked(next);
    setLoading(true);

    try {
      if (next) {
        // false → true
        await onAble(groupId);
      } else {
        // true → false
        await onDisable(groupId);
      }
    } catch (err) {
      console.error(err);
      // 실패 시 롤백
      setChecked(prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={checked}
      onCheckedChange={handleCheckedChange}
      disabled={loading}
      aria-label="Group toggle"
    />
  );
}
