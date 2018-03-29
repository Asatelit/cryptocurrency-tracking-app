import randBetween from './randBetween';

export default function generateTradingData(symbols, tickers, history = 100) {
  const priceRange = price => {
    const priceIn = randBetween(price / 1.2, price * 1.2);
    const priceOut = priceIn + randBetween(0, priceIn / 2);
    const priceMin = priceIn - randBetween(0, priceIn / 10);
    const priceMax = priceOut + randBetween(0, priceOut / 10);
    return price > 0
      ? { in: priceIn, out: priceOut, min: priceMin, max: priceMax }
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
    const price = priceRange(parseFloat(ticker.priceUsd));
    let open = price.in;

    return {
      id: ticker.id,
      symbol: ticker.symbol,
      name: ticker.name,
      close: price.out,
      open: price.in,
      high: price.max,
      low: price.min,
      volume: randBetween(10000, 20000),
      time: new Date(),
      history: Array.from({ length: history }, (el, index) => {
        const priceHist = priceRange(parseFloat(open));
        open = priceHist.in;
        return {
          close: open,
          open: priceHist.out,
          high: priceHist.max,
          low: priceHist.min,
          volume: randBetween(10, 10000),
          time: new Date(new Date().getTime() - index * 10000 * 60),
        };
      }),
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
  });
}
