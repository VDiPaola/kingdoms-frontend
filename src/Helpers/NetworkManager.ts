const BACKEND = "http://localhost:4000/";

export class NetworkManager{

    static buildOptions(body={}, method="POST", contentType="application/json"){
        const options:any = 
            {
                "headers": {
                    "Accept": "application/json, text/plain, */*",
                    "content-type":contentType,
                },
                "body": JSON.stringify(body),
                "method": method,
                "mode": "cors",
                "credentials": "include"
            };
        if(method === "GET"){
            delete options.body;
        }
       return options;
    }

    //basic get
    static REQUEST(endpoint:string, option:{}={}):Promise<{res:any,data:any}>{
        if(!option.hasOwnProperty("method")){
            option = this.buildOptions({}, "GET");
        }
        return new Promise((resolve,reject)=>{
            fetch(BACKEND + endpoint, option)
            .then(async (res) => {
                let data = {};
                try{
                    data = await res.json();
                }catch(err){}
                resolve({res, data})
            })
            .catch(err => reject(err));
        })
    }

}
