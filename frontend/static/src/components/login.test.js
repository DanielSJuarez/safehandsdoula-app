import Login from './login'
import App from '../App';
import { render, unmountComponentAtNode } from 'react-dom'
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";

describe('Login', () => {

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


    it('renders submit button', () => {
        render(
            <MemoryRouter initialEntries={["/login/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='login' element={<Login />} />
                    </Route>
                </Routes>
            </MemoryRouter>, container);
        expect(container.querySelector('button[type="submit"]')).not.toBeNull();
    })

    it('renders profile form', () => {
        render(
            <MemoryRouter initialEntries={["/login/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='login' element={<Login/>} />
                    </Route>
                </Routes>
            </MemoryRouter>, container);
        expect(container.querySelector('form')).not.toBeNull();
    })

    const rendersAnInputOfTypeText = (fieldName) => {
        it('renders an input of type text', () => {
            render(
                <MemoryRouter initialEntries={["/login/"]}>
                    <Routes>
                        <Route path='/' element={<App />}>
                            <Route path='login' element={<Login/>} />
                        </Route>
                    </Routes>
                </MemoryRouter>, container);
            const formField = container.querySelector('form').elements[fieldName]
            expect(formField.tagName).toEqual('INPUT')
            expect(formField.type).toEqual('text')
        }) 
    }

    const rendersAnInputOfTypePassword = (fieldName) => {
        it('renders an input of type email', () => {
            render(
                <MemoryRouter initialEntries={["/login/"]}>
                    <Routes>
                        <Route path='/' element={<App/>}>
                            <Route path='login' element={<Login />} />
                        </Route>
                    </Routes>
                </MemoryRouter>, container);
            const formField = container.querySelector('form').elements[fieldName]
            expect(formField.tagName).toEqual('INPUT')
            expect(formField.type).toEqual('password')
        }) 
    }

    describe('username field', () => {
        let fieldName = 'username'
        rendersAnInputOfTypeText(fieldName)
    })

    describe('password field', () => {
        let fieldName = 'password'
        rendersAnInputOfTypePassword(fieldName)
    })

})

