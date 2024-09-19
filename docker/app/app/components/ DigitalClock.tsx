import { useEffect, useState } from "react";
import { StyleSheet,Text , View} from "react-native";
import {LayoutChangeEvent } from "react-native";



const  DigitalClock = () => {
  const[time, settime] = useState<String[]>([]);


  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const handleLayout = (event:LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
    console.log(setDimensions)
  };

  
  useEffect(() => {
    setInterval(() => {
      let t = new Date();
      let hour = t.getHours().toString().padStart(2, '0');
      let minite = t.getMinutes().toString().padStart(2, '0');
      settime([hour + ':' + minite]);
    }, 1000);
  },[])
  return(
    <View style = {styles.Container}>
      <View style = {styles.DiditalFlame}>
        <Text style = {styles.DiditalText} onLayout={handleLayout}>
          {time}
        </Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 0.7,
    backgroundColor: "#001125",
  },
  DiditalFlame:{
    flex: 1,
    backgroundColor: "#4b58c8",
    justifyContent: 'center', // 縦方向に中央揃え
    alignItems: 'center', // 横方向に中央揃え
    margin:"7%",
    borderRadius:30
  },
  DiditalText:{
    fontSize: 100,
    color: "white",
    textAlign: 'center',
  },

});
export default DigitalClock;