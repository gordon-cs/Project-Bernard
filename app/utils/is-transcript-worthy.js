export default function isTranscriptWorthy(part) {
    return (part === "AC" ||
        part === "CAPT" ||
        part === "CODIR" ||
        part === "CORD" ||
        part === "DIREC" ||
        part === "PRES" ||
        part === "RA1" ||
        part === "RA2" ||
        part === "RA3" ||
        part === "SEC" ||
        part === "VICEC" ||
        part === "VICEP");
}
