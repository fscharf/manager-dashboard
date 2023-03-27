import { HighchartsReact } from 'highcharts-react-official'
import { memo } from 'react'
import * as Highcharts from 'highcharts'

type Props = {
  title: string
  categories: string[]
  series: Highcharts.SeriesOptionsType[]
  options?: Highcharts.Options
}

const Chart = ({ title, categories, series, options }: Props) => {
  const highchartsOptions: Highcharts.Options = {
    title: {
      text: title
    },
    chart: {
      type: 'bar'
    },
    xAxis: {
      categories
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderWidth: 0
      }
    },
    series,
    ...options
  }

  return <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
}

export default memo(Chart)
