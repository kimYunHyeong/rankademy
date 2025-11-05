"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  /** on → API */
  onTurnOn?: () => Promise<void> | void;
  /** off → API */
  onTurnOff?: () => Promise<void> | void;
  /** 내부 상태로 쓸 초기값 (controlled로 쓰면 props.checked 사용) */
  initialChecked?: boolean;
};

function Switch({
  className,
  onTurnOn,
  onTurnOff,
  initialChecked = false,
  checked: controlledChecked,
  onCheckedChange: controlledOnChange,
  ...props
}: SwitchProps) {
  const isControlled = controlledChecked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] =
    React.useState(initialChecked);
  const checked = isControlled ? controlledChecked! : uncontrolledChecked;

  const [pending, setPending] = React.useState(false);

  const setChecked = (v: boolean) => {
    if (!isControlled) setUncontrolledChecked(v);
    controlledOnChange?.(v);
  };

  const handleChange = async (next: boolean) => {
    // optimistic UI
    const prev = checked;
    setChecked(next);
    setPending(true);
    try {
      if (next) {
        await onTurnOn?.();
      } else {
        await onTurnOff?.();
      }
    } catch (e) {
      // 롤백
      setChecked(prev);
      console.error(e);
      // TODO: toast나 alert로 사용자에게 알려주기
    } finally {
      setPending(false);
    }
  };

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      disabled={pending || props.disabled}
      checked={checked}
      onCheckedChange={handleChange}
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border shadow-xs transition-all outline-none",
        "data-[state=unchecked]:bg-[#25242A] data-[state=unchecked]:border-white",
        "data-[state=checked]:bg-transparent data-[state=checked]:border-[#FF5679]",
        "focus-visible:ring-[3px] focus-visible:ring-[#FF5679]/40 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          "data-[state=unchecked]:bg-white data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:bg-[#FF5679] data-[state=checked]:translate-x-[calc(100%-2px)]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
