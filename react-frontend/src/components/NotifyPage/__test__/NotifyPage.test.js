import React from "react";
import { render, screen } from "@testing-library/react";

import NotifyPage from "../NotifyPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders notify page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <NotifyPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("notify-datatable")).toBeInTheDocument();
    expect(screen.getByRole("notify-add-button")).toBeInTheDocument();
});
