import { Card, Title, BarChart } from "@tremor/react";
import React from 'react'

interface ChartBarProps{
    title: string;
    categories: string;
    dataChar: object;
}




const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
};


export const ChartBar = ({title, categories, dataChar}: ChartBarProps) => {
    return (
        <>
            <Card>
                <Title className="">{title}</Title>
                <BarChart
                    className="mt-6"
                    data={dataChar}
                    index="name"
                    categories={[`${categories}`]}
                    colors={["blue"]}
                    valueFormatter={dataFormatter}
                    yAxisWidth={48}
                />
            </Card>
        </>
    )
}
