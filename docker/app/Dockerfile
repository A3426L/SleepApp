FROM node:20
WORKDIR /app/app
RUN apt update && apt install -y bash
RUN npm install react-native-gifted-chat --save
RUN npm install axios
RUN npm install expo@51.0.32
#RUN npx create-expo-app@latest
CMD npx expo start
