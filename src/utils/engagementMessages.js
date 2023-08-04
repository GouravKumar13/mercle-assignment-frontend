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
    console.log(seriesData);

    // Step 3: Create the Highcharts options object.
    const options = {
        title: {
            text: "Engagement Messages Over Time",
        },
        xAxis: {
            type: "datetime",
            title: {
                text: "Date",
            },
            crosshair: true,
        },
        yAxis: {
            title: {
                text: "Message Count",
            },
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.series.name}</b><br/>Date: ${Highcharts.dateFormat(
                    "%Y-%m-%d",
                    this.x
                )}<br/>Messages: ${this.y}`;
            },
        },

        series: seriesData
    };

    return options;
}


const EngagementMessagesOverTime = ({ messageCountList, channels }) => {
    const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels);
    return <HighchartsReact highcharts={ Highcharts } options={ options } />;
};

export default EngagementMessagesOverTime;
