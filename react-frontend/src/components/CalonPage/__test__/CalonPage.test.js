import React from "react";
import { render, screen } from "@testing-library/react";

import CalonPage from "../CalonPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders calon page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CalonPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("calon-datatable")).toBeInTheDocument();
    expect(screen.getByRole("calon-add-button")).toBeInTheDocument();
});
