// src/utils/transactionHelpers.ts

export function parseData(data: string[][]): any[] {
    let parsedData = data.map(row => ({
      Datum: row[0],
      Tijd: row[1],
      Product: row[2],
      ISIN: row[3],
      Beurs: row[4],
      Uitvoeringsplaats: row[5],
      Aantal: parseFloat(row[6]),
      Koers: parseFloat(row[7]),
      KoersValuta: row[8],
      LokaleWaarde: parseFloat(row[9]),
      LokaleWaardeValuta: row[10],
      Waarde: parseFloat(row[11]),
      WaardeValuta: row[12],
      Wisselkoers: row[13] ? parseFloat(row[13]) : null,
      Transactiekosten: parseFloat(row[14]),
      TransactiekostenValuta: row[15],
      Totaal: parseFloat(row[16]),
      TotaalValuta: row[17],
      OrderID: row[18]
    }));
  
    parsedData = addUnixtime(parsedData);
    addType(parsedData);
    return parsedData.sort((a, b) => a.unixtime - b.unixtime);
  }
  
  export function groupBy(arr: any[], field: string): any[] {
    const hash: {[key: string]: any} = {};
    arr.forEach(item => {
      if (hash[item[field]] === undefined)
        hash[item[field]] = { id: item[field], name: item.Product, transactions: [] };
      hash[item[field]].transactions.push(item);
    });
    const groups = Object.keys(hash).map(key => hash[key]);
    groups.forEach(group => {
      const data = group.transactions;
      group.sumBuy = data.filter(({ type }) => type === 'buy').reduce(sumField('Totaal'), 0);
      group.sumSell = data.filter(({ type }) => type === 'sell').reduce(sumField('Totaal'), 0);
      group.sumAll = data.reduce(sumField('Totaal'), 0);
      group.sumAantal = data.reduce(sumField('Aantal'), 0);
      group.returnsRatio = ((group.sumSell / group.sumBuy * -1) - 1) * 100;
      group.className = group.sumAantal > 0 ? "bg-blue-100" : (group.sumAll >= 0 ? "bg-green-100" : "bg-red-100");
    });
    return groups.sort((a, b) => b.returnsRatio - a.returnsRatio);
  }
  
  function addUnixtime(data: any[]): any[] {
    return data.map(datum => {
      const [DD, MM, YYYY] = datum.Datum.split('-');
      const [HH, mm] = datum.Tijd.split(':');
      datum.unixtime = Date.parse(`${YYYY}-${MM}-${DD}T${HH}:${mm}:00`);
      return datum;
    });
  }
  
  function addType(data: any[]): any[] {
    return data.map(datum => {
      datum.type = datum.Aantal > 0 ? "buy" : "sell";
      datum.className = datum.Aantal > 0 ? "bg-green-100" : "bg-red-100";
      return datum;
    });
  }
  
  function sumField(field: string) {
    return (sum: number, item: any) => sum + item[field];
  }