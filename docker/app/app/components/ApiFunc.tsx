import axios from "axios";


const URL = 'http://172.16.42.21/api/data'

const postData = {
    userid:'test'
};

const fetchPosts = async () => {
    try {
      const response = await axios.get(URL);
      const arrayPost = response.data.documents;
      console.log(arrayPost); // dataの確認
    } catch (error) {
      console.error(error);
    }
  }

const sendPostRequest = async () => {
    try {
        // POSTリクエストを送信
        const response = await axios.post(URL, postData);

        // レスポンスデータをコンソールに出力
        console.log('Response Data:', response.data);
    } catch (error) {
        console.error(error);
      }
}
