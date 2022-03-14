import CreateProfile from './createProfile'
import {render, unmountComponentAtNode} from 'react-dom'

describe ('CreateProfil', () => {

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
        render(<CreateProfile/>, container);
        expect(container.textContent).toInclude('Article Two')
    })
})