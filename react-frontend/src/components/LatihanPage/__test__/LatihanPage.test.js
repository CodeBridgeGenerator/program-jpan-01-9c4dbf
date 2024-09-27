import React from "react";
import { render, screen } from "@testing-library/react";

import LatihanPage from "../LatihanPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders latihan page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LatihanPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("latihan-datatable")).toBeInTheDocument();
    expect(screen.getByRole("latihan-add-button")).toBeInTheDocument();
});
