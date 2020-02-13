import React from "react";
// no default export, so we're importing everyting from this library
import * as rtl from "@testing-library/react";
// not importing to a variable, since this just overrides jest global variables
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import axios from "axios";

jest.mock("axios", () => {
	return {
		get: jest.fn(() =>
			Promise.resolve({
				data: {
					results: ["name"],
				},
			}),
		),
	};
});

test("Loader Displays", async () => {
	const wrapper = rtl.render(<App />);
	const load = wrapper.getByTestId("load");
	const result = await load;
	expect(result).toBeVisible();
});

test("Next button clicked", async () => {
	const wrapper = rtl.render(<App />);

	await wrapper.findAllByTestId("apiDiv");

	const nextClick = wrapper.getByText(/next/i);
	rtl.act(() => rtl.fireEvent.click(nextClick));

	expect(wrapper.findAllByTestId("apiDiv")).toBeTruthy();
});

test("Prev button clicked", async () => {
	const wrapper = rtl.render(<App />);

	await wrapper.findAllByTestId("apiDiv");

	const prevClick = wrapper.getByText(/previous/i);
	rtl.act(() => rtl.fireEvent.click(prevClick));

	expect(wrapper.findAllByTestId("apiDiv")).toBeTruthy();
});

test("made an api call", async () => {
	const wrapper = rtl.render(<App />);

	await wrapper.findAllByAltText(/logo/i);

	expect(axios.get).toHaveBeenCalled();
});
