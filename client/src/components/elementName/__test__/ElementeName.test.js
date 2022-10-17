import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ElementName from "../ElementName";

test("should display tooltip", () => {
  render(<ElementName properties={{ name: "hello element" }} />);

  const elem = screen.getByText("hello element");
  expect(elem).toBeInTheDocument();
});
