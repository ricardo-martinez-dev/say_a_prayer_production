import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tags from "../Tags";

test("should display tags", () => {
  render(<Tags tags={["foo", "bar"]} />);

  const tags = ["foo", "bar"];

  tags.forEach((tag) => {
    screen.getByText(`#${tag}`);
  });
});
