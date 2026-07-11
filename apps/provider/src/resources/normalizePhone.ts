type NormalizePhoneResult =
  | {
      ok: true;
      value: string;
    }
  | {
      ok: false;
      value?: never;
    };

export const normalizePhone = (input: string): NormalizePhoneResult => {
  if (!/^\d{10}$/.test(input)) {
    return { ok: false };
  }

  return {
    ok: true,
    value: `(${input.slice(0, 3)})${input.slice(3, 6)}-${input.slice(6)}`,
  };
};
