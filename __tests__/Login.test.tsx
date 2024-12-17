import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Page from "@/app/[locale]/login/page";
import LocaleProvider from "@/app/[locale]/component/LocaleProvider";
import AuthProvider from "@/services/auth/AuthProvider";
import { Dictionary } from "@/model";
import getDictionary from "@/dictionary/dictionary";

// Mock router
const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

// Mock fetchData
jest.mock("../src/lib/fetchData", () => jest.fn());

// Define dictionary for testing
let mockDict: Dictionary;

// Mock AuthActionsContext
const setUserMock = jest.fn();

describe("Page Component", () => {
  const renderPage = async (isRegistering = false) => {
    render(
      <AuthProvider initialUser={null}>
        <LocaleProvider locale="en-US" dict={mockDict}>
          <Page />
        </LocaleProvider>
      </AuthProvider>
    );
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockDict = await getDictionary("en-US", "index");
  });

  test("renders login form initially", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: mockDict.auth_login_title })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(mockDict.auth_login_input_username_label)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(mockDict.auth_login_input_password_label)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockDict.auth_register_accept_terms_of_services_text)
    ).toBeInTheDocument();
  });

  test("allows user input for name and password", async () => {
    renderPage();

    const usernameInput = screen.getByLabelText(
      mockDict.auth_login_input_username_label
    );
    const passwordInput = screen.getByLabelText(
      mockDict.auth_login_input_password_label
    );

    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "password123");

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password123");
  });

  test("handles login API response: success", async () => {
    // Mock fetch to return success response
    global.fetch = jest.fn(() =>
      Promise.resolve({ status: 201 } as Response)
    ) as jest.Mock;

    renderPage();

    const loginButton = screen.getByRole("button", {
      name: mockDict.auth_login_title,
    });

    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/user", expect.any(Object));
      expect(mockReplace).toHaveBeenCalledWith("/");
      expect(setUserMock).toHaveBeenCalled();
    });
  });

  test("handles login API response: wrong password", async () => {
    // Mock fetch to return 401
    global.fetch = jest.fn(() =>
      Promise.resolve({ status: 401 } as Response)
    ) as jest.Mock;

    renderPage();

    const loginButton = screen.getByRole("button", {
      name: mockDict.auth_login_title,
    });

    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText(mockDict.auth_message_login_error_wrong_password)
      ).toBeInTheDocument();
    });
  });

  test("switches to register form on partial response", async () => {
    // Mock fetch to return 206
    global.fetch = jest.fn(() =>
      Promise.resolve({ status: 206 } as Response)
    ) as jest.Mock;

    renderPage();

    const loginButton = screen.getByRole("button", {
      name: mockDict.auth_login_title,
    });

    await userEvent.click(loginButton);

    expect(
      screen.getByRole("heading", { name: "Register" })
    ).toBeInTheDocument();
  });

  test("triggers Google OAuth button click", () => {
    renderPage();

    const googleButton = screen.getByText("Sign in with Google");

    const googleLink = screen.getByRole("link", { hidden: true });

    const mockDispatchEvent = jest.spyOn(
      window.HTMLAnchorElement.prototype,
      "dispatchEvent"
    );

    fireEvent.click(googleButton);

    expect(mockDispatchEvent).toHaveBeenCalledWith(expect.any(MouseEvent));
    expect(googleLink).toBeInTheDocument();
  });
});
