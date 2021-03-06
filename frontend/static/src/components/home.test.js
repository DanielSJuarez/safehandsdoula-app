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

    it('renders an article header' , () => {
        render(
            <MemoryRouter initialEntries={["/home/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='home' element={<Home/>}/>
                    </Route>
                </Routes>
            </MemoryRouter>, container);
        expect(container.textContent).toContain('Article Two')
    })

    it('renders an article div' , () => {
        render(
            <MemoryRouter initialEntries={["/home/"]}>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='home' element={<Home/>}/>
                    </Route>
                </Routes>
            </MemoryRouter>, container);
         expect(container.querySelector('div')).not.toBeNull();
    })
})

