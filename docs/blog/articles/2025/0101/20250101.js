function primeFactorization(n) {
    if(!Number.isInteger(n))throw new Error();
    if (n < 2) return []; // 2未満は素因数なし
    const factors = [];
    let divisor = 2;
    while (n >= 2) {
        while (n % divisor === 0) {
            factors.push(divisor);
            n = n / divisor;
        }
        divisor++;
        // 最適化: divisorがnの平方根を超えたら、nは素数
        if (divisor * divisor > n && n > 1) {
            factors.push(n);
            break;
        }
    }
    return factors;
}
function getDatesForYear(year) {
    if(!Number.isInteger(year))throw new Error();
    const dates = [];
    const startDate = new Date(year, 0, 1); // 年の1月1日
    const endDate = new Date(year, 11, 31); // 年の12月31日
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date)); // 新しいDateオブジェクトを作成して配列に追加
    }
    return dates;
}
function formatDateToYyyymmdd(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0始まりなので+1
    const day = String(date.getDate()).padStart(2, '0'); // 日付を2桁にする
    return `${year}${month}${day}`;
}