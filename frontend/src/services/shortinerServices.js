import baseAPI from './api';

class ShortinerServices {
    constructor(){
        this.api=baseAPI("http://localhost:3001/")
    }

    async getLink(code){
        const result = await this.api.get(`links/${code}`);

        return result.data;
    }

    async getStatus(code){
        const result = await this.api.get(`links/${code}/status`);

        return result.data; 
    }

    async generate(model){

        const result = await this.api.post('links', model);

        return result.data;
    }
}

export default ShortinerServices;