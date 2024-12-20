import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "@/app/[locale]/login/page"; // Adjust the path based on your file structure
import AuthProvider from "@/services/auth/AuthProvider";
import LocaleProvider from "@/app/[locale]/component/LocaleProvider";
import { toast } from "sonner";
import { Dictionary } from "@/model";
import getDictionary from "@/dictionary/dictionary";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockRouterReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockRouterReplace,
  }),
}));

const mockSetUser = jest.fn();
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("Page Component", () => {
  let mockDict: Dictionary;

  beforeAll(async () => {
    mockDict = await getDictionary("en-US", "index");
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockImplementation(() =>
      Promise.resolve({ status: 201, json: () => Promise.resolve({}) })
    );
  });

  const renderComponent = async () => {
    render(
      <AuthProvider initialUser={null}>
        <LocaleProvider dict={mockDict} locale={"en-US"}>
          <Page />
        </LocaleProvider>
      </AuthProvider>
    );
  };

  it("renders login form by default", () => {
    renderComponent();
    const heading = screen.getByRole("heading");
    expect(heading.innerText == mockDict.auth_login_title);
  });

  it("shows error if name or password is empty on login", async () => {
    renderComponent();
    const submitButton = screen.getByRole("button", {
      name: mockDict.auth_login_title,
    });
    fireEvent.click(submitButton);
    expect(toast.error).toHaveBeenCalledWith(
      mockDict.auth_register_name_or_password_could_not_be_empty_warning_text
    );
  });

  // it("shows error if passwords do not match during registration", async () => {
  //   renderComponent();

  //   fireEvent.change(
  //     screen.getByLabelText(mockDict.auth_login_input_username_label),
  //     {
  //       target: { value: "testuser" },
  //     }
  //   );
  //   fireEvent.change(
  //     screen.getByLabelText(mockDict.auth_login_input_password_label),
  //     {
  //       target: { value: "password123" },
  //     }
  //   );

  //   const isUserExistResponse = { status: 206 };
  //   mockFetch.mockResolvedValueOnce(isUserExistResponse);

  //   fireEvent.click(screen.getByText(mockDict.auth_login_title));

  //   await waitFor(() =>
  //     expect(screen.getByText("Register")).toBeInTheDocument()
  //   );

  //   fireEvent.change(screen.getByLabelText("confirm password"), {
  //     target: { value: "differentPassword" },
  //   });

  //   fireEvent.click(screen.getByText("Register"));

  //   expect(toast.error).toHaveBeenCalledWith(
  //     mockDict.auth_register_wrong_confirm_password
  //   );
  // });

  // it("calls login endpoint and navigates on success", async () => {
  //   renderComponent();

  //   fireEvent.change(
  //     screen.getByLabelText(mockDict.auth_login_input_username_label),
  //     {
  //       target: { value: "testuser" },
  //     }
  //   );
  //   fireEvent.change(
  //     screen.getByLabelText(mockDict.auth_login_input_password_label),
  //     {
  //       target: { value: "password123" },
  //     }
  //   );

  //   fireEvent.click(screen.getByText(mockDict.auth_login_title));

  //   await waitFor(() =>
  //     expect(toast.success).toHaveBeenCalledWith(
  //       mockDict.auth_message_login_success
  //     )
  //   );
  //   expect(mockRouterReplace).toHaveBeenCalledWith("/");
  //   expect(mockSetUser).toHaveBeenCalled();
  // });

  // it("shows error if login fails", async () => {
  //   mockFetch.mockResolvedValueOnce({ status: 401 });

  //   renderComponent();

  //   fireEvent.change(
  //     screen.getByLabelText(mockDict.auth_login_input_username_label),
  //     {
  //       target: { value: "testuser" },
  //     }
  //   );
  //   fireEvent.change(
  //     screen.getByLabelText(mockDict.auth_login_input_password_label),
  //     {
  //       target: { value: "wrongpassword" },
  //     }
  //   );

  //   fireEvent.click(screen.getByText(mockDict.auth_login_title));

  //   await waitFor(() =>
  //     expect(toast.error).toHaveBeenCalledWith(
  //       mockDict.auth_message_login_error_wrong_password
  //     )
  //   );
  // });
});
