import randBetween from './randBetween';

export default function generateTradingData(symbols, tickers, histLenght = 60) {
  const priceRange = price => {
    const priceOut = randBetween(price / 1.2, price * 1.2);
    const min = Math.min(price, priceOut);
    const max = Math.max(price, priceOut);
    const priceMin = randBetween(min, min / 1.1);
    const priceMax = randBetween(max, max * 1.1);
    return price > 0
      ? { in: price, out: priceOut, min: priceMin, max: priceMax }
      : { in: 0, out: 0, min: 0, max: 0 };
  };

  return symbols.map(symbol => {
    const fallout = {
      symbol,
      name: `${symbol} (unrecognized)`,
      id: symbol,
      priceUsd: '0',
    };
    const ticker = tickers.find(entry => symbol === entry.symbol) || fallout;
    const value = parseFloat(ticker.priceUsd);
    const price = priceRange(randBetween(value / 1.1, value * 1.1));
    let open = price.in;
    const entry = {
      id: ticker.id,
      symbol: ticker.symbol,
      name: ticker.name,
      close: price.out,
      open: price.in,
      chg: price.out - price.in,
      high: price.max,
      low: price.min,
      volume: randBetween(10, 10000),
      time: new Date(),
      technicalMinutes15: randBetween(-1, 1),
      technicalMinutes30: randBetween(-1, 1),
      technicalHourly: randBetween(-1, 1),
      technicalWeekly: randBetween(-1, 1),
      technicalMonthly: randBetween(-1, 1),
      performanceDaily: randBetween(-100, 100),
      performanceWeek: randBetween(-100, 100),
      performanceMonth: randBetween(-100, 100),
      performanceYtd: randBetween(-100, 100),
      performanceYear: randBetween(-100, 100),
      performanceYear3: randBetween(-100, 100),
    };
    const history = Array.from({ length: histLenght }, (el, index) => {
      const priceHist = priceRange(open);
      open = priceHist.out;
      return {
        close: priceHist.in,
        open: priceHist.out,
        high: priceHist.max,
        low: priceHist.min,
        volume: randBetween(10, 10000),
        time: new Date(new Date().getTime() - (index + 1) * 10000 * 60),
      };
    });

    return {
      ...entry,
      history: [entry, ...history],
    };
  });
}
