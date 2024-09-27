import React from "react";
import { render, screen } from "@testing-library/react";

import KelulusanCreateDialogComponent from "../KelulusanCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders kelulusan create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <KelulusanCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("kelulusan-create-dialog-component")).toBeInTheDocument();
});
