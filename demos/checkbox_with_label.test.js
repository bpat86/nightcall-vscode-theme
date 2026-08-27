import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckboxWithLabel from "../CheckboxWithLabel";

it("changes the label after a click", async () => {
  const user = userEvent.setup();
  render(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  const checkbox = screen.getByRole("checkbox", { name: "Off" });
  expect(checkbox).not.toBeChecked();

  await user.click(checkbox);

  expect(screen.getByRole("checkbox", { name: "On" })).toBeChecked();
});
