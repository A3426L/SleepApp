import axios from "axios";
import { AxiosResponse } from "axios";


//const URL = 'http://172.16.42.14/testpost'
const IP='192.168.0.14';



//let getData:AxiosResponse<any, any>;

interface postData{
    user_id?: string,
    name?: string,
    pass?: string,
    message?: string,
    post_txt?: string,
    chat?: string,
};

//////////////////////////////////////////////////////////////////////
export interface postView_group{
    id : string,
    user_name: string,
    theme: string,
    post_txt: string
};
export interface postView_all{
    id: string,
    user_name: string,
    theme: string,
    post_txt:string
};

export interface movePost{
    theme : string
};

export interface post{
    flag:string 
};

export interface signup{
    flag : string
}

export interface login{
    flag : string
}

export interface get_userName{
    user_name : string
}

export interface matching_start{
 flag : string
}

export interface matching{
 flag : string
}

export interface chat_start{
    user_id0 : string,
    start_time : string,
    end_time : string,
    room_name : string
}
///////////////////////////////////////////////////////////////////////////////////////

export async function test(postData: postData) {
    const buf: postView_group[] | undefined = await sendPostRequest('http://' + IP + '/testpost', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}


export async function postView_group(postData: postData) {
    const buf: postView_group[] | undefined = await sendPostRequest('http://' + IP + '/postView_group', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function postView_all() {
    const buf: postView_all[] | undefined = await sendGetRequest('http://' + IP + '/postView_all');
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function movePost(postData: postData) {
    const buf: movePost | undefined = await sendPostRequest('http://' + IP + '/movePost', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function post(postData: postData) {
    const buf: post | undefined = await sendPostRequest('http://' + IP + '/post', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function signup(postData: postData) {
    const buf: signup | undefined = await sendPostRequest('http://' + IP + '/signup', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function login(postData: postData) {
    const buf: login | undefined = await sendPostRequest('http://' + IP + '/login', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function get_userName(postData: postData) {
    const buf: get_userName | undefined = await sendPostRequest('http://' + IP + '/get_userName', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function matching_start(postData: postData) {
    const buf: matching_start | undefined = await sendPostRequest('http://' + IP + '/matching_start', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function matching(postData: postData) {
    const buf: matching | undefined = await sendPostRequest('http://' + IP + '/matching', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function chat_start(postData: postData) {
    const buf: chat_start | undefined = await sendPostRequest('http://' + IP + '/chat_start', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}




///////////////////////////////////////////////////////////////////////////////////////
async function sendPostRequest(URL:string,Data:postData){
    let responseData;
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
    let responseData;
    try {
      const response = await axios.get(URL);
      responseData = response.data;
      console.log(responseData); // dataの確認
    } catch (error) {
      console.error(error);
    }
    return responseData;
  }