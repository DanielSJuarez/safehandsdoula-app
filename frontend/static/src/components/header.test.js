import Home from './home'
import App from '../App';
import {render, unmountComponentAtNode} from 'react-dom'
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";

describe ('Home', () => {

    let container = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('renders header content' , () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                    </Route>
                </Routes>
            </MemoryRouter>, container);
        expect(container.textContent).toContain('WhatHow')
    })

    it('renders an header li for nav' , () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                    </Route>
                </Routes>
            </MemoryRouter>, container);
         expect(container.querySelector('li')).not.toBeNull();
    })
})