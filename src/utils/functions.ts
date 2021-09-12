export const sortArrByDate = (Arr: { date: Date; search: string }[]) => {
    return Arr.sort((a: { date: Date }, b: { date: Date }) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}
