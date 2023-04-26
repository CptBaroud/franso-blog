export function useTheme(): boolean {
    const colorMode = useColorMode();

    return colorMode.preference === "dark";
}