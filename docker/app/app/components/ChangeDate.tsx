export default function ChangeDate(Date_S:string) {
    const year = Number(Date_S.slice(0, 4));
    const month = Number(Date_S.slice(4, 6));
    const day = Number(Date_S.slice(6, 8));
    const hours = Number(Date_S.slice(8, 10));
    const minutes = Number(Date_S.slice(10, 12));
    const seconds = Number(Date_S.slice(12));
    const dateFromYMDHMS = new Date(year,(month-1),day,hours,minutes,seconds);
    return dateFromYMDHMS;
}