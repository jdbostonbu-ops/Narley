// apps/provider/src/navigation/__tests__/ProviderAuthGate.test.tsx

import { render, screen } from "@testing-library/react-native";
import { ProviderAuthGate } from "../ProviderAuthGate";
import { useAuth } from "../../auth/useAuth";

jest.mock("../../auth/useAuth");

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("ProviderAuthGate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the Provider login screen when no authenticated user exists", () => {
    // MOCK FIRST — auth has resolved, and there is no user
    mockedUseAuth.mockReturnValue({ user: null, loading: false });

    render(<ProviderAuthGate />);

    // the login control is available to a logged-out user
    expect(screen.getByRole("button", { name: /log in/i })).toBeTruthy();

    // a logged-out user must NOT reach any Provider tab
    expect(screen.queryByText("Map")).toBeNull();
    expect(screen.queryByText("Post")).toBeNull();
    expect(screen.queryByText("My Posts")).toBeNull();
    expect(screen.queryByText("Alerts")).toBeNull();
    expect(screen.queryByText("Profile")).toBeNull();

    // account creation is NOT offered on the cold signed-out screen (QR-only)
    expect(screen.queryByText(/create account/i)).toBeNull();
  });
});