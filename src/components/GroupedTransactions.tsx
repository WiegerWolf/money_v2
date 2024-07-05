// src/components/GroupedTransactions.tsx
import { TransactionsTable } from './TransactionsTable';
import { UplotChart } from './UplotChart';
import { GroupedTransactions as GroupedTransactionsType, Transaction } from '../utils/transactionHelpers';

interface GroupedTransactionsProps {
  groupedData: GroupedTransactionsType[];
}

export function GroupedTransactions({ groupedData }: GroupedTransactionsProps) {
  return (
    <div className="space-y-8">
      {groupedData.map((group) => (
        <div key={group.id} id={group.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{group.name}</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Current Holdings</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{group.sumAantal}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Buy</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{group.sumBuy.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Sell</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{group.sumSell.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Earned</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{group.sumAll.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Return</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{group.returnsRatio.toFixed(2)}%</dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h4 className="text-lg leading-6 font-medium text-gray-900">Price History</h4>
            <UplotChart data={convertData(group.transactions)} />
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h4 className="text-lg leading-6 font-medium text-gray-900 mb-4">Transactions</h4>
            <TransactionsTable<Transaction>
              headers={['Datum', 'Tijd', 'Aantal', 'Koers', 'KoersValuta', 'Waarde', 'WaardeValuta', 'Totaal', 'TotaalValuta']}
              data={group.transactions}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function convertData(transactions: Transaction[]): [number[], number[]] {
  return transactions.reduce((memo: [number[], number[]], { Datum, Tijd, Koers }) => {
    if (memo[0].length === 0) {
      memo = [[], []];
    }

    const [day, month, year] = Datum.split('-');
    const _dateString = `${year}-${month}-${day}T${Tijd}`;
    const _date = Math.floor(Date.parse(_dateString) / 1000);

    memo[0].push(_date);
    memo[1].push(Koers);

    return memo;
  }, [[], []]);
}