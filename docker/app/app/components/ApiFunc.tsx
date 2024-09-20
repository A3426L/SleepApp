import axios from "axios";
import { AxiosResponse } from "axios";


//const URL = 'http://172.16.42.14/testpost'
const IP='172.16.42.31';



//let getData:AxiosResponse<any, any>;

export interface postData{
    user_id?: string,
    name?: string,
    pass?: string,
    post_txt?: string,
    message_txt?: string,
    id?: string,
    theme_txt?: string,
};

//////////////////////////////////////////////////////////////////////
export interface POSTVIEW_GROUP{
    id : string,
    user_name: string,
    theme: string,
    post_txt: string
};
export interface POSTVIEW_ALL{
    id: string,
    user_name: string,
    theme: string,
    post_txt:string
};

export interface MOVEPOST{
    theme : string
};

export interface POST{
    flag:string 
};

export interface SIGNUP{
    flag : string
}

export interface LOGIN{
    flag : string
}

export interface GET_USERNAME{
    user_name : string
}

export interface MATCHING_START{
 flag : string
}

export interface MATCHING{
 flag : string
}

export interface CHAT_START{
    user_id0 : string,
    start_time : string,
    end_time : string,
    room_name : string
}

export interface API_GET_MESSAGE{
    flag: string
}

export interface API_CHAT{
    id:string,
    messages:string,
    user_id:string,
    name:string,
}

export interface API_CHANGE_THEME{
    flag : string
}

export interface API_POST_THEME{
    flag : string
}
///////////////////////////////////////////////////////////////////////////////////////

export async function test(postData: postData) {
    const buf: POSTVIEW_GROUP[] | undefined = await sendPostRequest('http://' + IP + '/testpost', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}


export async function postView_group(postData: postData) {
    const buf: POSTVIEW_GROUP[] | undefined = await sendPostRequest('http://' + IP + '/postView_group', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function postView_all() {
    const buf: POSTVIEW_ALL[] | undefined = await sendGetRequest('http://' + IP + '/postView_all');
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function movePost(postData: postData) {
    const buf: MOVEPOST | undefined = await sendPostRequest('http://' + IP + '/movePost', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function post(postData: postData) {
    const buf: POST | undefined = await sendPostRequest('http://' + IP + '/post', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function signup(postData: postData) {
    const buf: SIGNUP | undefined = await sendPostRequest('http://' + IP + '/signup', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function login(postData: postData) {
    const buf: LOGIN | undefined = await sendPostRequest('http://' + IP + '/login', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function get_userName(postData: postData) {
    const buf: GET_USERNAME | undefined = await sendPostRequest('http://' + IP + '/get_userName', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function matching_start(postData: postData) {
    const buf: MATCHING_START | undefined = await sendPostRequest('http://' + IP + '/matching_start', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function matching(postData: postData) {
    const buf: MATCHING | undefined = await sendPostRequest('http://' + IP + '/matching', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function chat_start(postData: postData) {
    const buf: CHAT_START | undefined = await sendPostRequest('http://' + IP + '/chat_start', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function api_get_message(postData: postData) {
    const buf: API_GET_MESSAGE | undefined = await sendPostRequest('http://' + IP + '/api/get_message', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function api_chat(postData: postData) {
    const buf: API_CHAT[] | undefined = await sendPostRequest('http://' + IP + '/api/chat', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function api_change_theme(postData: postData) {
    const buf: API_CHANGE_THEME | undefined = await sendPostRequest('http://' + IP + '/api/change_theme', postData);
    
    // 取得したデータをコンソールに出力
    if (buf) {
        console.log('Response Data:', buf);
    } else {
        console.log('No data received');
    }
    return buf;
}

export async function api_post_theme(postData: postData) {
    const buf: API_POST_THEME | undefined = await sendPostRequest('http://' + IP + '/api/post_theme', postData);
    
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
        console.log('Response Data:', response);
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