import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const Title = () => {
    const title = useLocalSearchParams();

    return (
        <View style={style.container}>
            <SafeAreaView style={style.container}>
                {title.title}
            </SafeAreaView>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
      },
})

export default Title;
