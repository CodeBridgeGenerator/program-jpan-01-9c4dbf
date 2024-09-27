import React from "react";
import { render, screen } from "@testing-library/react";

import KelulusanPage from "../KelulusanPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders kelulusan page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <KelulusanPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("kelulusan-datatable")).toBeInTheDocument();
    expect(screen.getByRole("kelulusan-add-button")).toBeInTheDocument();
});
