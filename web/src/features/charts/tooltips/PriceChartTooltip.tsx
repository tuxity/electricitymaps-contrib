import getSymbolFromCurrency from 'currency-symbol-map';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { timeAverageAtom } from 'utils/state/atoms';

import { convertPrice } from '../bar-breakdown/utils';
import { InnerAreaGraphTooltipProps } from '../types';
import AreaGraphToolTipHeader from './AreaGraphTooltipHeader';

export default function PriceChartTooltip({ zoneDetail }: InnerAreaGraphTooltipProps) {
  const [timeAverage] = useAtom(timeAverageAtom);
  const { t } = useTranslation();

  if (!zoneDetail) {
    return null;
  }
  const { price: priceObject, stateDatetime } = zoneDetail;
  const { value, currency, unit } = convertPrice(
    priceObject?.value,
    priceObject?.currency
  );
  const currencySymbol = getSymbolFromCurrency(currency) ?? '?';
  const price = value ?? Number.NaN;

  return (
    <div className="w-full rounded-md bg-white p-3 shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 sm:w-64">
      <AreaGraphToolTipHeader
        datetime={new Date(stateDatetime)}
        timeAverage={timeAverage}
        squareColor="#7f7f7f" // TODO: use price scale color
        title={t('tooltips.price')}
      />
      <p className="flex justify-center text-base">
        <b className="mr-1">{price}</b>
        {currencySymbol} / {unit}
      </p>
    </div>
  );
}
