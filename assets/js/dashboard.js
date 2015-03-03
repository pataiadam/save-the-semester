/**
 * Created by pataiadam on 2015.03.03..
 */


$.get( "/dashboard/getmemorydata", function( data ) {

    var data = [
        { label: "Used heap memory",  data: data.heapUsed/1000000},
        { label: "Not used memory",  data: 500-(data.heapUsed/1000000)}
    ];

    $.plot('#flot-pie-chart', data,{
        series: {
            pie: {
                show: true,
                radius: 1,
                label: {
                    show: true,
                    radius: 3/4,
                    background: {
                        opacity: 0.5,
                        color: '#000'
                    }
                }
            }
        },
        legend: {
            show: false
        }
    });

});
