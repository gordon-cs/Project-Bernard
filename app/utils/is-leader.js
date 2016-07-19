export default function isLeader(participationCode) {
    return (participationCode === "CAPT" ||
        participationCode === "CODIR" ||
        participationCode === "CORD" ||
        participationCode === "DIREC" ||
        participationCode === "PRES" ||
        participationCode === "VICEC" ||
        participationCode === "VICEP");
}
