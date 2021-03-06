import CreateProfile from './createProfile'
import App from '../App';
import { render, unmountComponentAtNode } from 'react-dom'
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";

describe('CreateProfile', () => {

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

    it('renders profile header', () => {
        render(
            <MemoryRouter initialEntries={["/create/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='create' element={<CreateProfile />} />
                    </Route>
                </Routes>
            </MemoryRouter>, container);
        expect(container.textContent).toContain("Your Profile")
    })

    it('renders submit button', () => {
        render(
            <MemoryRouter initialEntries={["/create/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='create' element={<CreateProfile />} />
                    </Route>
                </Routes>
            </MemoryRouter>, container);
        expect(container.querySelector('button[type="submit"]')).not.toBeNull();
    })

    it('renders profile form', () => {
        render(
            <MemoryRouter initialEntries={["/create/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='create' element={<CreateProfile />} />
                    </Route>
                </Routes>
            </MemoryRouter>, container);
        expect(container.querySelector('form')).not.toBeNull();
    })

    const rendersAnInputOfTypeText = (fieldName) => {
        it('renders an input of type text', () => {
            render(
                <MemoryRouter initialEntries={["/create/"]}>
                    <Routes>
                        <Route path='/' element={<App />}>
                            <Route path='create' element={<CreateProfile/>} />
                        </Route>
                    </Routes>
                </MemoryRouter>, container);
            const formField = container.querySelector('form').elements[fieldName]
            expect(formField.tagName).toEqual('INPUT')
            expect(formField.type).toEqual('text')
        }) 
    }

    describe('name field', () => {
        let fieldName = 'name'
        rendersAnInputOfTypeText(fieldName)
    })

    describe('name field', () => {
        let fieldName = 'services'
        rendersAnInputOfTypeText(fieldName)
    })

    describe('name field', () => {
        let fieldName = 'why'
        rendersAnInputOfTypeText(fieldName)
    })

    describe('name field', () => {
        let fieldName = 'about'
        rendersAnInputOfTypeText(fieldName)
    })

})

