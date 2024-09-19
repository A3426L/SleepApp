export default function ChangeDate(Date_S:string) {
    const timeZoneOffset = '+09:00';
    const year = (Date_S.slice(0, 4));
    const month = (Date_S.slice(4, 6));
    const day = (Date_S.slice(6, 8));
    const hours = (Date_S.slice(8, 10));
    const minutes = (Date_S.slice(10, 12));
    const seconds = (Date_S.slice(12));
    const dateFromYMDHMS = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneOffset}`;
    return dateFromYMDHMS;
}