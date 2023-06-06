import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import blurBg from "./src/assets/bg-blur.png";
import Stripes from "./src/assets/stripes.svg";
import NLWLogo from "./src/assets/nlw-spacetime-logo.svg";
import { styled } from "nativewind";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import { api } from "./src/lib/api";

const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/879d1d0219231a69da42',
};

export default function App() {
  const [hasLoadFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '879d1d0219231a69da42',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery
  );

  useEffect(() => {
    
    if (response?.type === 'success') {
      const { code } = response.params;

      api.post('/register', {
        code,
      }).then((response) => {
        const { token } = response.data

        console.log(token)
      })

    }
  }, [response]);

  if (!hasLoadFonts) {
    return null;
  }


  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center justify-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: "absolute", left: "-100%" }}
    >
      <StyledStripes className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => signInWithGithub()}
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        © Copyright - Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}