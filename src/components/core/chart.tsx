import { HighchartsReact } from 'highcharts-react-official'
import { memo } from 'react'
import * as Highcharts from 'highcharts'

type Props = {
  title?: string
  categories?: string[]
  series?: Highcharts.SeriesOptionsType[]
  options?: Highcharts.Options
}

const Chart = ({ title, categories, series, options }: Props) => {
  const highchartsOptions: Highcharts.Options = {
    title: {
      text: title
    },
    chart: {
      type: 'column'
    },
    xAxis: {
      categories
    },
    tooltip: {
      borderWidth: 0,
      formatter: function () {
        return `${this.point.category}:<br/><b>${this.point.y}</b>`
      },
      ...options?.tooltip
    },
    plotOptions: {
      column: {
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
