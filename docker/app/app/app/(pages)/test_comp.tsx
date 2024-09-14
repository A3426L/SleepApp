import { useEffect, useState } from "react";
import { Text , View} from "react-native";

const Diditaltimer = () => {
  const[time, settime] = useState<String[]>([]);
  
  useEffect(() => {
    setInterval(() => {
      let t = new Date();
      let hour = t.getHours().toString().padStart(2, '0');
      let minite = t.getMinutes().toString().padStart(2, '0');
      let second = t.getSeconds().toString().padStart(2, '0');
      settime([hour + ':' + minite + ':' + second]);
    }, 1000);
  },[])
  return(
    <Text style = {{
      fontSize: 50,
    }}>
      {time}
    </Text>
  );
}
export default Diditaltimer;