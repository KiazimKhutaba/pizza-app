import NotFound from '../Pages/NotFound.js';
import ProductsList from '../Pages/ProductsList.js';
import LoginView from '../Pages/LoginView.js';



/**
 * 
 * @param {Function} component HTML markup
 */
const render = (component, args) => {
    
    const obj = new component(args);

    app.innerHTML = obj.render();

    // if class contains method eventHandler init method
    if( typeof obj.eventHandler === 'function' ) {
        obj.eventHandler();
    }    
}


/**
 * 
 * @param {HTMLElement} app 
 * @param {Object} screens 
 */
function Router(app, screens)
{

    const hashChangeHandler = (e) => {

        const { hash } = new URL(e.newURL);
        //log(!!hash);


        if( hash.startsWith('#!') ) 
        {
            // stops default actiom
            e.preventDefault();

            const Component = screens[hash.slice(2)];

            //log(Component);

            if( !Component ) {
                render(NotFound, hash.slice(2));
            }
            else {
                render(Component);
            }

            
            //location.hash = hash;
        }
    }
    
    
    render(LoginView);
    window.addEventListener('hashchange', hashChangeHandler);
}


export default Router;