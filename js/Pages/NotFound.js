
class NotFound 
{

    constructor(page) {
        this.page = page;
    }


    eventHandler() {

    }

    
    render() 
    {
        return /* html */`
            <p>Requested url <b>${this.page}</b> not found</p>
        `;
    }

}

export default NotFound;