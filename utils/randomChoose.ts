export default <T>(items: Array<T>) => {
    const index = Math.floor((Math.random() * items.length))
    return items[index]
}
