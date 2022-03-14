import Home from './home'
import {render, unmountComponentAtNode} from 'react-dom'

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

    it('renders an article' , () => {
        render(<Home/>, container);
        expect(container.textContent).toInclude('Article Two')
    })
})