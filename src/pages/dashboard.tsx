import { theme } from "@chakra-ui/core";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ApexOptions } from 'apexcharts';
import { Pagination } from "../components/Pagination";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false // faz com que o arquivo seja carregado no DOM e não no backend
})

const options: ApexOptions = {
    chart: {
        toolbar: {
            show: false //barra de opções
        },
        zoom: {
            enabled: false
        },
        foreColor: "#FFFFFF" //cor dos números e informações cartesianas
    },
    grid: {
        show: false //linhas do grafico
    },
    dataLabels: {
        enabled: false//números em caixas
    },
    tooltip: {
        enabled: false
    },
    xaxis: {//informações cartesianas em X
        type: 'datetime',
        axisBorder: {
            color: "#FFFFFF"
        },
        axisTicks: {
            color: "#FFFFFF"
        },
        categories: [
            '2020-03-18T00:00.000Z',
            '2020-03-19T00:00.000Z',
            '2020-03-21T00:00.000Z',
            '2020-03-22T00:00.000Z',
            '2020-03-23T00:00.000Z',
            '2020-03-24T00:00.000Z',
            '2020-03-25T00:00.000Z'
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }
}

const series = [
    {
        name: 'Series 1',
        data: [31, 120, 10, 28, 61, 18, 109]
    }
]
export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh">

            <Header />

            <Flex
                w="100%"
                my="6"
                maxWidth={1480}
                mx="auto"
                px="6"
            >
                <Sidebar />

                <SimpleGrid
                    flex="1"
                    gap="4"
                    minChildWidth="320px"
                    align="flex-start"
                >

                    <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text
                            fontSize="lg"
                            mb="4"
                        >
                            Inscritos da semana
                        </Text>
                        <Chart
                            type="area"
                            height="160"
                            options={options}
                            series={series}
                        />
                    </Box>

                    <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text
                            fontSize="lg"
                            mb="4"
                        >
                            Taxa de abertura
                        </Text>
                        <Chart
                            type="area"
                            height="160"
                            options={options}
                            series={series}
                        />
                    </Box>

                </SimpleGrid>
            </Flex>
        </Flex>
    )
}