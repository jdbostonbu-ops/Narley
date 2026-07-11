type User = {
  id: string;
};

type Membership = {
  status: string;
  org: {
    status: string;
    active: boolean;
  };
};

export const canWritePin = (
  user: User | null,
  membership: Membership | null,
): boolean =>
  user !== null &&
  membership !== null &&
  membership.status === "ACTIVE" &&
  membership.org.status === "VERIFIED" &&
  membership.org.active;
