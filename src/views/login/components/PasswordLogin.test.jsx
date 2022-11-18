import { render } from "@testing-library/react";
import PasswordLogin from "./PasswordLogin";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/aalss/as/s",
  }),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../../utils/auth", () => ({
  useAuth: () => ({
    setAuth: jest.fn(),
  }),
}));

describe(PasswordLogin, () => {
  it("Error message field should be empty initially", () => {
    const { queryAllByTestId } = render(<PasswordLogin />);
    const err_val = queryAllByTestId("error-alert");
    expect(err_val).toHaveLength(0);
  });
});
