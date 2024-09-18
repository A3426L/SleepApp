import axios from "axios";
import { AxiosResponse } from "axios";


//const URL = 'http://172.16.42.14/testpost'
const IP='172.16.42.27';

const postData = {
    user_id:'test'
};

//let getData:AxiosResponse<any, any>;

interface postData{
    user_id?: string,
    name?: string,
    pass?: string,
    message?: string,
    post_txt?: string,
    chat?: string,
};
interface getData{
    received_user_id?:string,
    ///////////////////////////////
    postView_group?:[{
        id : string,
        user_name: string,
        theme: string,
        post_txt: string
    }],
    postView_all?:[
    {
        id : string,
        user_name: string,
        theme: string,
        post_txt:string,
    }],
    movePost?:{theme:string
    };
}


export async function test(postData: postData) {
    const buf: getData | undefined = await sendPostRequest('http://' + IP + '/testpost', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
}


export function signup(postData:postData){
    sendPostRequest('http://'+IP+'/signup',postData);
}



async function sendPostRequest(URL:string,Data:postData){
    let responseData:getData|undefined;
    try {
        // POSTリクエストを送信
        const response = await axios.post(URL, Data);
        // レスポンスデータをコンソールに出力
        responseData = response.data;
        //console.log('Response Data:', response);
    } catch (error) {
        console.error(error);
    }
    return responseData;
}



async function sendGetRequest(URL:string){
    try {
      const response = await axios.get(URL);
      const arrayPost = response.data.documents;
      console.log(arrayPost); // dataの確認
    } catch (error) {
      console.error(error);
    }
  }