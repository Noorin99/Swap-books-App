import { render, fireEvent } from "@testing-library/react";
import Counter from "./components/Counter";

describe(Counter, () => {
  it("get initial >> ", () => {
    const { getAllByTestId } = render(<Counter initial={0} />);
    const countValue = getAllByTestId("count");
    expect(Number(countValue[0].textContent)).toEqual(0);
  });
  it("increment + 1  ", () => {
    const { getAllByTestId, getByRole } = render(<Counter initial={0} />);
    const incrementBtn = getByRole("button", { name: "Increment++" });
    const countValue = getAllByTestId("count");
    expect(Number(countValue[0].textContent)).toEqual(0);
    fireEvent.click(incrementBtn);
    const countValue2 = getAllByTestId("count");
    expect(Number(countValue2[0].textContent)).toEqual(1);
  });
});
