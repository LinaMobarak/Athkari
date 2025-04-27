/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000 ';
const tintColorDark = '#fff';
const primarycolor= '#826387';
const secondColor= 'rgb(255, 255, 255)';
const mainColor= '#b588a7';
const scndryColor= '#b588a7';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f7f6f2',
    tint: tintColorLight,
    icon: 'black',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    second: secondColor,
    maincolor: mainColor,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: 'white',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    second: secondColor,
    maincolor: mainColor,
  },
  primary: primarycolor,
  secondaryColor: scndryColor,
};
