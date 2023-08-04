import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const engagementHelper = {};

engagementHelper.engagementMessageOverTimeChartOptions = (messageCountList, channels) => {
    // Step 1: Filter out channels with messages on only a single date.
    const channelsWithMultipleDates = channels.filter((channel) => {

        const dates = messageCountList.filter((item) => item.channelId === channel.value).map((item) => item.timeBucket);

        return new Set(dates).size > 1;
    });
    console.log(channelsWithMultipleDates);

    // Step 2: Prepare the data for Highcharts.
    const seriesData = channelsWithMultipleDates.map((channel) => {
        return {
            name: channel.label,
            data: messageCountList
                .filter((item) => item.channelId === channel.value)
                .map((item) => [Date.parse(item.timeBucket), parseInt(item.count)]),
        };
    });

    // Step 3: Create the Highcharts options object.
    const options = {
        chart: {
            backgroundColor: "black", //set the background color of chart
        },
        title: {
            text: "Engagement Messages Over Time",
            style: {
                color: "white" //set the title color
            }
        },
        xAxis: {
            type: "datetime",
            title: {
                text: "Date",
                style: {
                    color: "gray" //set the title color
                }

            },
            labels: {
                style: {
                    color: "gray" //set the title color
                },
            },
            tickInterval: 24 * 3600 * 1000,

            crosshair: true,
        },
        yAxis: {
            title: {
                text: "Message Count",
                style: {
                    color: "gray" //set the title color
                }
            },
            labels: {
                style: {
                    color: "gray" //set the title color
                }
            },
            gridLineWidth: 0
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.series.name}</b><br/> ${this.y} Messages on ${Highcharts.dateFormat(
                    "%e %b",
                    this.x
                )}`
            },

            borderWidth: 2,
            borderColor: "#00FFEF",
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true, // Show markers at data points
                },
                color: "#00FFEF"
            },
            spline: {
                marker: {
                    enabled: false, // Disable markers for spline series
                },
            },
        },
        series: seriesData.map((data) => ({ ...data, type: "spline" })),
    };

    return options;
}


const EngagementMessagesOverTime = ({ messageCountList, channels }) => {
    const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels);
    return <HighchartsReact highcharts={ Highcharts } options={ options } />;
};

export default EngagementMessagesOverTime;
