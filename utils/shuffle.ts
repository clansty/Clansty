//Fisher–Yates 洗牌算法
export default function shuffle<T>(arr: T[]) {
    let i = arr.length
    while (i) {
        const j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]]
    }
    return arr
}
