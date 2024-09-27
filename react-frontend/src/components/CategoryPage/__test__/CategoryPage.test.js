import React from "react";
import { render, screen } from "@testing-library/react";

import CategoryPage from "../CategoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders category page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CategoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("category-datatable")).toBeInTheDocument();
    expect(screen.getByRole("category-add-button")).toBeInTheDocument();
});
