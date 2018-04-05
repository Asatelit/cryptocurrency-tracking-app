import randBetween from './randBetween';

export default function generateTradingData(
  symbols,
  tickers,
  trading = [],
  histLength = 60,
) {
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
    const fallbackTicker = tickers.find(entry => symbol === entry.symbol) || fallout;
    const ticker = trading.find(entry => symbol === entry.symbol) || fallbackTicker;
    const value = parseFloat(ticker.priceUsd || ticker.close);
    const price = priceRange(value);
    let open = price.out;
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

    let history = [];

    if (ticker.history) {
      history = ticker.history.splice(0, histLength);
    } else {
      history = Array.from({ length: histLength }, (el, index) => {
        const priceHist = priceRange(open);
        open = priceHist.out;
        return {
          index,
          close: priceHist.in,
          open: priceHist.out,
          high: priceHist.max,
          low: priceHist.min,
          volume: randBetween(10, 10000),
          time: new Date(new Date().getTime() - (index + 1) * 1000 * 60),
        };
      });
    }
    return {
      ...entry,
      history: [entry, ...history],
    };
  });
}
