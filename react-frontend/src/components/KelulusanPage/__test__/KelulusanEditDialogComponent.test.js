import React from "react";
import { render, screen } from "@testing-library/react";

import KelulusanEditDialogComponent from "../KelulusanEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders kelulusan edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <KelulusanEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("kelulusan-edit-dialog-component")).toBeInTheDocument();
});
