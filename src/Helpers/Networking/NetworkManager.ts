const BACKEND = "http://localhost:4000/";

export type ResponseType<T extends object> = {
    response:Response,
    data:T
}

export class NetworkManager{

    static buildOptions(body={}, method="POST", contentType="application/json"): RequestInit{
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
    static REQUEST<T extends object>(endpoint:string, option:{}={}, useBackend:boolean=true):Promise<ResponseType<T>>{
        if(!option.hasOwnProperty("method")){
            option = this.buildOptions({}, "GET");
        }

        if(useBackend){endpoint = BACKEND + endpoint}

        return new Promise((resolve,reject)=>{
            fetch(endpoint, option)
            .then(async (res) => {
                let data = {};
                try{
                    data = await res.json();
                }catch(err){}
                resolve({response:res, data:data as T});
            })
            .catch(err => reject(err));
        })
    }

}
